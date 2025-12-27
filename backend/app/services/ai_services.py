import os
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage
from dotenv import load_dotenv

load_dotenv()

class State(TypedDict):
    messages: list
    response: str

class AIService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.7
        )
        self.graph = self._create_graph()
    
    def _create_graph(self):
        """Create the LangGraph workflow."""
        def chat_node(state: State) -> State:
            """Generate response using Gemini."""
            # Convert dict messages to LangChain messages
            lc_messages = []
            for msg in state["messages"]:
                if msg["role"] == "user":
                    lc_messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    lc_messages.append(AIMessage(content=msg["content"]))
                elif msg["role"] == "system":
                    # Add system message as first human message
                    lc_messages.insert(0, HumanMessage(content=f"System: {msg['content']}"))
            
            response = self.llm.invoke(lc_messages)
            return {"response": response.content, "messages": state["messages"]}
        
        # Build graph
        workflow = StateGraph(State)
        workflow.add_node("chat", chat_node)
        workflow.set_entry_point("chat")
        workflow.add_edge("chat", END)
        return workflow.compile()
    
    async def chat(self, messages: List[Dict[str, Any]]) -> str:
        """Process chat messages."""
        try:
            result = await self.graph.ainvoke({
                "messages": messages,
                "response": ""
            })
            return result["response"]
        except Exception as e:
            print(f"Error in chat service: {e}")
            return "I apologize, but I encountered an error. Please try again."