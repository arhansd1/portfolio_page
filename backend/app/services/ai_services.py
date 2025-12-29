import os
from typing import TypedDict, List, Dict, Any, Optional  # Add Optional here
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage, BaseMessage
from dotenv import load_dotenv
from ..basic_info import basic_info


load_dotenv()

SYSTEM_PROMPT = """
You are a helpful AI assistant for a portfolio website.
You only answer using provided data from {basic_info} as your main source of information.
You do NOT fabricate information.

"""

class State(TypedDict):
    messages: list
    response: str
    # Persistent tracking variables
    current_topic: Optional[str]           # "projects" / "experience" / "skills" / "personal"
    selected_item: Optional[str]           # "Autofill Extension" / "CleanSV" / etc.
    imp_points: Optional[List[str]]        # Track important points being discussed
    interest_score: int                    # 0-10
    follow_up_count: int                   # How many consecutive questions on same topic
    mode: str                              # "casual" / "deep_dive"

class AIService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.7
        )
        self.graph = self._create_graph()

    def _create_graph(self):

        def chat_node(state: State) -> State:
            all_messages: list[BaseMessage] = []
            last_human_message = None

            for msg in state["messages"]:
                if msg["role"] == "user":
                    hm = HumanMessage(content=msg["content"])
                    all_messages.append(hm)
                    last_human_message = hm
                elif msg["role"] == "assistant":
                    all_messages.append(AIMessage(content=msg["content"]))

            if not last_human_message:
                raise ValueError("No user message provided")

            llm_input = [SystemMessage(content=SYSTEM_PROMPT)] + all_messages[-16:]

            response = self.llm.invoke(llm_input)

            state["messages"].append({"role": "assistant", "content": response.content})
            return {
                "messages": state["messages"], 
                "response": response.content,
                # Keep persistent variables unchanged
                "current_topic": state.get("current_topic"),
                "selected_item": state.get("selected_item"),
                "imp_points": state.get("imp_points"),
                "interest_score": state.get("interest_score", 0),
                "follow_up_count": state.get("follow_up_count", 0),
                "mode": state.get("mode", "casual")
                
                }


        graph = StateGraph(State)
        graph.add_node("chat", chat_node)
        graph.set_entry_point("chat")
        graph.add_edge("chat", END)
        return graph.compile()

    async def chat(self, messages: List[Dict[str, Any]], state_vars: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Now returns both response AND updated state variables
        """
        # Initialize state with persistent variables
        initial_state = {
            "messages": messages,
            "response": "",
            # Load previous state or use defaults
            "current_topic": state_vars.get("current_topic") if state_vars else None,
            "selected_item": state_vars.get("selected_item") if state_vars else None,
            "imp_points": state_vars.get("imp_points") if state_vars else None,
            "interest_score": state_vars.get("interest_score", 0) if state_vars else 0,
            "follow_up_count": state_vars.get("follow_up_count", 0) if state_vars else 0,
            "mode": state_vars.get("mode", "casual") if state_vars else "casual"
        }
        
        result = await self.graph.ainvoke(initial_state)
        
        # Return response + updated state variables
        return {
            "response": result["response"],
            "state": {
                "current_topic": result.get("current_topic"),
                "selected_item": result.get("selected_item"),
                "imp_points": result.get("imp_points"),
                "interest_score": result.get("interest_score", 0),
                "follow_up_count": result.get("follow_up_count", 0),
                "mode": result.get("mode", "casual")
            }
        }