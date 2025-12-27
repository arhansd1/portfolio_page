import os
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage , SystemMessage
from dotenv import load_dotenv

load_dotenv()

SYSTEM_PROMPT = """
You are a helpful AI assistant for a portfolio website.
You only answer using provided data.
You do NOT fabricate information.
"""

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

        def chat_node(state: State) -> State:
            chat_messages = [
                SystemMessage(content=SYSTEM_PROMPT)
            ]

            for msg in state["messages"]:
                if msg["role"] == "user":
                    chat_messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    chat_messages.append(AIMessage(content=msg["content"]))

            response = self.llm.invoke(chat_messages)

            return {
                "messages": state["messages"],
                "response": response.content
            }

        graph = StateGraph(State)
        graph.add_node("chat", chat_node)
        graph.set_entry_point("chat")
        graph.add_edge("chat", END)
        return graph.compile()

    async def chat(self, messages: List[Dict[str, Any]]) -> str:
        result = await self.graph.ainvoke({
            "messages": messages,
            "response": ""
        })
        return result["response"]