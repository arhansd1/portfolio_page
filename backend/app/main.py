import sys
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

# Add the parent directory to the Python path
sys.path.append(str(Path(__file__).parent.parent))

from app.config import settings, Message, ChatRequest, ChatResponse
from app.services.ai_services import AIService

# Initialize FastAPI app
app = FastAPI(
    title="Portfolio AI Backend",
    description="Backend service for portfolio chat application",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=settings.CORS_ALLOW_CREDENTIALS,
    allow_methods=settings.CORS_ALLOW_METHODS,
    allow_headers=settings.CORS_ALLOW_HEADERS,
)

# Initialize AI service
ai_service = AIService()

@app.get("/")
async def root():
    return {"message": "Portfolio AI Backend is running"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        response = await ai_service.chat(
            [msg.dict() for msg in request.messages]
        )
        return ChatResponse(response=response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)