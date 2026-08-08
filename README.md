# AI-Based Interview Preparation Platform

This repository contains a Vite + React frontend and a TypeScript + Express backend for an AI-based interview preparation platform.

## Run locally

1. Clone the repo
   - git clone https://github.com/gowtham099-byte/AI-BasedInterviewPreparationPlatform.git
   - cd AI-BasedInterviewPreparationPlatform

2. Install dependencies and run both servers (frontend + backend):
   - npm install
   - npm run dev:all

3. Or run separately:
   - Frontend only: npm run dev (then open http://localhost:5173)
   - Backend only:
     - cd ai-interview-backend
     - npm install
     - npm run dev (runs ts-node-dev)
     - Backend will run on http://localhost:4000 by default

## API Endpoints (development)

- GET /health
  - Returns { "status": "ok" }
- GET /api/interviews/questions
  - Returns a JSON object: { "questions": [ { id, questionText, ... }, ... ] }
- POST /api/interviews/answer
  - Accepts { questionId, answer } and returns feedback.

## Notes

- The backend currently uses simple file-based persistence (ai-interview-backend/data/answers.json) to store submitted answers. This is intended for development and demo purposes only.
- The AI analysis service is a placeholder with simple heuristics; you can replace it with a real AI integration later.

