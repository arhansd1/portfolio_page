# Portfolio AI Backend

## Setup
1. Create virtual environment: `python -m venv venv`
2. Activate: `source venv/bin/activate` (macOS/Linux) or `venv\Scripts\activate` (Windows)
3. Install dependencies: `pip install -r requirements.txt`
4. Create `.env` file with your `ANTHROPIC_API_KEY`
5. Run: `uvicorn app.main:app --reload`

## API Endpoints
- `GET /`: Health check
- `POST /api/chat`: Send chat messages
```

---

## Root README.md

```markdown
# AI Portfolio with Interactive Chat

A modern portfolio website with an AI-powered chat assistant.

## Features
- Split-screen layout with portfolio and chat
- Smooth scrolling between sections
- Interactive AI chat that knows your background
- Quick action buttons for common queries
- Monochromatic, modern design

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Python, FastAPI, Anthropic Claude API

## Quick Start

### 1. Clone and Setup Frontend
```bash
cd frontend
npm install
```

### 2. Setup Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

### 3. Configure Environment Variables
Create `.env` files in both frontend and backend directories:

**frontend/.env**
```
VITE_API_URL=http://localhost:8000
```

**backend/.env**
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 4. Run the Application

**Terminal 1 - Backend**
```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 2 - Frontend**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000`

## Customization
Edit `frontend/src/data/portfolioData.js` with your information.

## License
MIT
```

---

## Summary

**Total Structure:**
- Frontend: 20+ files organized by feature
- Backend: Clean FastAPI structure with services
- All installation commands provided
- Complete file contents included

**To start developing:**
```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend (separate terminal)
cd backend && python -m venv venv && source venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload