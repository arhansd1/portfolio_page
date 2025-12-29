import os
from dotenv import load_dotenv
from typing import List, Literal, Optional, Dict, Any
from pydantic import BaseModel

# Load environment variables
load_dotenv()

class Message(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    state: Optional[Dict[str, Any]] = None

class ChatResponse(BaseModel):
    response: str
    state: Dict[str, Any]
    selection_options: Optional[List[Dict[str, Any]]] = None

class Settings:
    # API Keys
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    
    # CORS settings
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000"
    ]
    CORS_ALLOW_CREDENTIALS: bool = True
    CORS_ALLOW_METHODS: List[str] = ["*"]
    CORS_ALLOW_HEADERS: List[str] = ["*"]
    CORS_EXPOSE_HEADERS: List[str] = ["*"]
    
    # Model settings
    MODEL_NAME: str = "gemini-2.5-flash-lite"
    TEMPERATURE: float = 0.7
    MAX_TOKENS: int = 1000
    
    # Server settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    RELOAD: bool = True
    
    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = True

# Create settings instance
settings = Settings()