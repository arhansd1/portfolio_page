import anthropic
from app.config import settings

class AIService:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    
    def get_portfolio_context(self):
        return """You are a helpful assistant for a portfolio website. Answer questions about the person's background using this data:
        
        Name: [Your Name]
        Title: AI/GenAI Engineer
        
        Experience:
        - Senior AI Engineer at Tech Company (2023-Present): Led development of GenAI applications using LLMs. Built RAG systems.
        - ML Engineer at Previous Company (2021-2023): Developed ML models for recommendation systems.
        
        Projects:
        - AI Assistant Platform (Python, LangChain, FastAPI, React): Enterprise AI assistant with RAG, 10k+ users
        - Custom LLM Fine-tuning (PyTorch, Transformers, LoRA): Fine-tuned LLMs with 40% accuracy improvement
        - Computer Vision Pipeline (TensorFlow, OpenCV, Docker): Real-time object detection, 1000+ images/second
        
        Skills:
        - AI/ML: LLMs, RAG, Fine-tuning, Prompt Engineering, LangChain
        - Languages: Python, JavaScript, SQL
        - Frameworks: PyTorch, TensorFlow, FastAPI, React
        - Tools: Docker, AWS, Git, Vector DBs
        
        Keep responses concise and friendly. If asked about specific sections, provide relevant details."""
    
    async def chat(self, messages: list) -> str:
        try:
            response = self.client.messages.create(
                model="claude-sonnet-4-20250514",
                max_tokens=1000,
                system=self.get_portfolio_context(),
                messages=[{"role": msg["role"], "content": msg["content"]} for msg in messages]
            )
            
            return response.content[0].text
        except Exception as e:
            print(f"Error calling Anthropic API: {e}")
            raise