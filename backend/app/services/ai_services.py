import os
import json
from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage, BaseMessage
from dotenv import load_dotenv
from ..data.basic_info import basic_info
from ..data.detailed_info import detailed_info

load_dotenv()

class State(TypedDict):
    messages: list
    response: str
    # Persistent tracking variables
    current_topic: Optional[str]
    selected_item_id: Optional[int]
    imp_points: Optional[List[str]]
    mode: str
    needs_interrupt: bool

INITIAL_ROUTER_PROMPT = f'''
You are an intelligent routing agent that analyzes conversations and determines the flow.

**YOUR TASK:**
Analyze the conversation and return ONLY a JSON object (no other text) with these fields:

{{
  "current_topic": "projects" | "experience" | "skills" | "personal" | null,
  "selected_item_id": number | null,
  "imp_points": ["key point 1", "key point 2"] | null,
  "mode": "chat" | "deep_dive",
  "needs_interrupt": true | false
}}

**AVAILABLE DATA:**
{json.dumps(basic_info, indent=2)}

**RULES:**

1. **current_topic**: Detect what category they're asking about
   - "projects" if asking about projects/built/developed
   - "experience" if asking about internships/work/jobs
   - "skills" if asking about technologies/programming
   - "personal" if asking about background/education
   - null if general chat

2. **selected_item_id**: The ID from the data (1, 2, 3, etc.)
   - Find the matching ID from the data
   - null if no specific item selected

3. **imp_points**: List of important topics being discussed
   - Extract key themes like ["LangGraph", "AI architecture", "challenges faced"]
   - null if nothing specific yet

4. **mode**: Determine conversation depth
   - "chat" for casual questions, overviews, general info
   - "deep_dive" ONLY if they explicitly ask for:
     * "deep dive"
     * "in-depth explanation"
     * "tell me more about the technical details"
     * "how did you build/implement"
     * Multiple detailed follow-up questions on same topic

5. **needs_interrupt**: Whether HITL selection is needed
   - true if:
     * They want deep dive BUT haven't specified which project/experience
     * They ask "tell me about your projects" (plural) and want details
     * mode is "deep_dive" AND selected_item_id is null
   - false if:
     * Already have selected_item_id
     * Just casual chat
     * They're asking general questions

**EXAMPLES:**

User: "Hey how are you?"
{{
  "current_topic": null,
  "selected_item_id": null,
  "imp_points": null,
  "mode": "chat",
  "needs_interrupt": false
}}

User: "Tell me about your projects"
{{
  "current_topic": "projects",
  "selected_item_id": null,
  "imp_points": null,
  "mode": "chat",
  "needs_interrupt": false
}}

User: "I want a deep dive into your projects"
{{
  "current_topic": "projects",
  "selected_item_id": null,
  "imp_points": null,
  "mode": "deep_dive",
  "needs_interrupt": true
}}

User: "Tell me about the Autofill Extension"
{{
  "current_topic": "projects",
  "selected_item_id": 1,
  "imp_points": null,
  "mode": "chat",
  "needs_interrupt": false
}}

User: "How did you implement the AI in the Autofill Extension?"
{{
  "current_topic": "projects",
  "selected_item_id": 1,
  "imp_points": null,
  "mode": "deep_dive",
  "needs_interrupt": false
}}

User: "Tell me more technical details about CleanSV"
{{
  "current_topic": "projects",
  "selected_item_id": 2,
  "imp_points": null,
  "mode": "deep_dive",
  "needs_interrupt": false
}}

**IMPORTANT:**
- Return ONLY valid JSON
- No markdown, no code blocks, no explanation
- Just the JSON object
'''


def get_chat_prompt(state: State) -> str:
    """Generate chat prompt with context from state variables"""
    
    context_parts = [
        "**STRICT RULES**",
        "- You only answer using provided data from (basic_info) as your main source of information regarding profile enquiries.",
        "- You do NOT fabricate information.",
        "- If you are talking about PROJECTS or EXPERIENCE always end with 'Would you like to deep dive into any of these topics?'",
        "",
        "**OBJECTIVE**",
        "You are a helpful AI assistant for a portfolio website who provides accurate information based on the provided profile data.",
        "If they ask any technical information not relevant to the profile person but on the technical side, you can answer through your knowledge base, with citations of (basic_info) if any.",
        "Explain in a concise and clear manner.",
        "",
        "**AVAILABLE DATA:**",
        json.dumps(basic_info, indent=2),
        ""
    ]
    
    # Add conversation context if available
    if state.get("current_topic"):
        context_parts.append(f"**CURRENT TOPIC:** {state['current_topic']}")
    
    if state.get("selected_item_id"):
        context_parts.append(f"**SELECTED ITEM ID:** {state['selected_item_id']}")
    
    if state.get("imp_points"):
        context_parts.append(f"**IMPORTANT POINTS DISCUSSED:** {', '.join(state['imp_points'])}")
    
    return "\n".join(context_parts)


def get_deep_dive_prompt(state: State) -> str:
    """Generate deep dive prompt with specific item data if available"""
    
    # Base prompt
    context_parts = [
        "**OBJECTIVE**",
        "You are an expert technical interviewer providing in-depth technical information about projects and experiences.",
        "Focus on:",
        "- Technical implementation details and architecture decisions",
        "- Problem-solving approaches and challenges faced",
        "- Code patterns, best practices, and design choices",
        "- Performance considerations and trade-offs made",
        "- Tools and technologies used and why they were chosen",
        "",
        "Keep responses detailed but concise, suitable for technical discussion.",
        ""
    ]
    
    # Get specific data based on selected_item_id
    selected_id = state.get("selected_item_id")
    current_topic = state.get("current_topic")
    
    if selected_id and current_topic:
        context_parts.append("**DETAILED DATA FOR THIS ITEM:**")
        
        if current_topic == "projects":
            # Find specific project
            project = next(
                (p for p in detailed_info["det_projects"]["projects"] if p["id"] == selected_id),
                None
            )
            if project:
                context_parts.append(json.dumps(project, indent=2))
            else:
                # Fallback to all projects if not found
                context_parts.append(json.dumps(detailed_info["det_projects"], indent=2))
        
        elif current_topic == "experience":
            # Find specific experience
            experience = next(
                (e for e in detailed_info["det_experience"]["experience"] if e["id"] == selected_id),
                None
            )
            if experience:
                context_parts.append(json.dumps(experience, indent=2))
            else:
                # Fallback to all experiences if not found
                context_parts.append(json.dumps(detailed_info["det_experience"], indent=2))
    else:
        # No specific item selected, provide all detailed info
        context_parts.append("**AVAILABLE DETAILED DATA:**")
        context_parts.append(json.dumps(detailed_info, indent=2))
    
    context_parts.append("")
    
    # Add conversation context
    if state.get("imp_points"):
        context_parts.append(f"**KEY POINTS TO ADDRESS:** {', '.join(state['imp_points'])}")
    
    return "\n".join(context_parts)

class AIService:
    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash-lite",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
            temperature=0.7
        )
        self.graph = self._create_graph()

    def _create_graph(self):

        def initial_router_node(state: State) -> State:
            """
            Analyzes conversation and determines routing.
            Also handles selection responses from frontend.
            """
            last_message = state["messages"][-1]["content"]
            
            # Check if this is a selection response (JSON string)
            if last_message.startswith("Selected:") or (last_message.strip().startswith("{") and "type" in last_message):
                try:
                    # Parse selection
                    if last_message.startswith("Selected:"):
                        # Extract JSON from "Selected: {json}" format
                        json_str = last_message.split("Selected:", 1)[1].strip()
                    else:
                        json_str = last_message.strip()
                    
                    selection = json.loads(json_str)
                    
                    # Update state with selection
                    selected_type = selection.get("type")
                    current_topic = None
                    if selected_type == "project":
                        current_topic = "projects"
                    elif selected_type == "experience":
                        current_topic = "experience"  

                    # IMPORTANT: Preserve the mode from previous state
                    # This ensures we continue with chat/deep_dive as originally intended
                    return {
                        "messages": state["messages"],
                        "response": "",
                        "current_topic": current_topic,
                        "selected_item_id": selection.get("id"),
                        "imp_points": state.get("imp_points"),
                        "mode": state.get("mode", "chat"),  # Uses previous mode from state
                        "needs_interrupt": False,  # Clear interrupt flag
                        "selection_options": None
                    }
                except json.JSONDecodeError:
                    pass  # Not a selection, continue normal routing
            
            # Build conversation context for normal routing
            all_messages: list[BaseMessage] = []
            for msg in state["messages"]:
                if msg["role"] == "user":
                    all_messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    all_messages.append(AIMessage(content=msg["content"]))

            # Call LLM to analyze and route
            llm_input = [SystemMessage(content=INITIAL_ROUTER_PROMPT)] + all_messages[-10:]
            
            response = self.llm.invoke(llm_input)
            
            # Parse JSON response
            try:
                # Clean the response (remove markdown if present)
                response_text = response.content.strip()
                if response_text.startswith("```json"):
                    response_text = response_text.split("```json")[1].split("```")[0].strip()
                elif response_text.startswith("```"):
                    response_text = response_text.split("```")[1].split("```")[0].strip()
                
                routing_decision = json.loads(response_text)
                
                # Update state with routing decision
                return {
                    "messages": state["messages"],
                    "response": "",  # No chat output from this node
                    "current_topic": routing_decision.get("current_topic"),
                    "selected_item_id": routing_decision.get("selected_item_id"),
                    "imp_points": routing_decision.get("imp_points"),
                    "mode": routing_decision.get("mode", "chat"),
                    "needs_interrupt": routing_decision.get("needs_interrupt", False),
                }
                
            except json.JSONDecodeError as e:
                print(f"Failed to parse routing decision: {e}")
                print(f"Response was: {response.content}")
                
                # Fallback to safe defaults
                return {
                    "messages": state["messages"],
                    "response": "",
                    "current_topic": state.get("current_topic"),
                    "selected_item_id": state.get("selected_item_id"),
                    "imp_points": state.get("imp_points"),
                    "mode": "chat",
                    "needs_interrupt": False,
                }

        def selection_node(state: State) -> State:
            """
            HITL node - just signals frontend to show selection UI.
            Frontend will generate options based on current_topic.
            """
            return {
                **state,
                "response": "Please select what you'd like to explore:",
                "needs_interrupt": True
                # REMOVED: All selection_options generation logic
            }

        def chat_node(state: State) -> State:
            """
            Handles normal conversation using basic_info data.
            Provides conversational responses about projects, experience, and skills.
            """
            # Build conversation history
            all_messages: list[BaseMessage] = []
            for msg in state["messages"]:
                if msg["role"] == "user":
                    all_messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    all_messages.append(AIMessage(content=msg["content"]))
            
            # Generate prompt with context
            system_prompt = get_chat_prompt(state)
            
            # Call LLM
            llm_input = [SystemMessage(content=system_prompt)] + all_messages[-10:]
            response = self.llm.invoke(llm_input)
            
            return {
                **state,
                "response": response.content,
                "needs_interrupt": False
            }
        
        def deep_dive_node(state: State) -> State:
            """
            Handles detailed technical discussions using detailed_info data.
            Provides in-depth technical responses with specific item data if available.
            """
            # Build conversation history
            all_messages: list[BaseMessage] = []
            for msg in state["messages"]:
                if msg["role"] == "user":
                    all_messages.append(HumanMessage(content=msg["content"]))
                elif msg["role"] == "assistant":
                    all_messages.append(AIMessage(content=msg["content"]))
            
            # Generate prompt with context and specific item data
            system_prompt = get_deep_dive_prompt(state)
            
            # Call LLM
            llm_input = [SystemMessage(content=system_prompt)] + all_messages[-10:]
            response = self.llm.invoke(llm_input)
            
            return {
                **state,
                "response": response.content,
                "needs_interrupt": False
            }

        # Routing functions
        def route_after_initial(state: State) -> str:
            """
            Routes based on initial_router_node output.
            
            Flow logic:
            1. If needs_interrupt=True → Show selection UI (go to selection node)
            2. If needs_interrupt=False → Process normally (go to chat/deep_dive)
            
            Note: After selection node shows options and returns END, the user's 
            selection comes back as a NEW message which triggers initial_router again.
            At that point, needs_interrupt will be False and we'll route to chat/deep_dive.
            """
            needs_interrupt = state.get("needs_interrupt", False)
            mode = state.get("mode", "chat")
            
            # HITL needed - show selection UI and pause
            if needs_interrupt:
                return "selection"
            
            # No HITL needed - process the message
            if mode == "deep_dive":
                return "deep_dive"
            else:
                return "chat"

        # Build graph
        graph = StateGraph(State)
        
        # Add nodes
        graph.add_node("initial_router", initial_router_node)
        graph.add_node("selection", selection_node)
        graph.add_node("chat", chat_node)
        graph.add_node("deep_dive", deep_dive_node)
        
        # Set entry point - ALL messages start here
        graph.set_entry_point("initial_router")
        
        # Routing after initial_router
        # This determines which node to go to based on the routing decision
        graph.add_conditional_edges(
            "initial_router",
            route_after_initial,
            {
                "selection": "selection",    # needs_interrupt=True
                "chat": "chat",              # needs_interrupt=False, mode="chat"
                "deep_dive": "deep_dive"    # needs_interrupt=False, mode="deep_dive"
            }
        )
        
        # Selection node always ends - waits for user to pick from UI
        # The user's selection comes back as a NEW message which restarts the graph
        graph.add_edge("selection", END)
        
        # Chat and deep_dive nodes end after generating response
        graph.add_edge("chat", END)
        graph.add_edge("deep_dive", END)
        
        return graph.compile()

    async def chat(self, messages: List[Dict[str, Any]], state_vars: Dict[str, Any] = None) -> Dict[str, Any]:
        """
        Process chat with state
        """
        initial_state = {
            "messages": messages,
            "response": "",
            "current_topic": state_vars.get("current_topic") if state_vars else None,
            "selected_item_id": state_vars.get("selected_item_id") if state_vars else None,
            "imp_points": state_vars.get("imp_points") if state_vars else None,
            "mode": state_vars.get("mode", "chat") if state_vars else "chat",
            "needs_interrupt": state_vars.get("needs_interrupt", False) if state_vars else False,
        }
        
        result = await self.graph.ainvoke(initial_state)
        
        return {
            "response": result["response"],
            "state": {
                "current_topic": result.get("current_topic"),
                "selected_item_id": result.get("selected_item_id"),
                "imp_points": result.get("imp_points"),
                "mode": result.get("mode", "chat"),
                "needs_interrupt": result.get("needs_interrupt", False),
            },
            "needs_interrupt": result.get("needs_interrupt", False),
        }