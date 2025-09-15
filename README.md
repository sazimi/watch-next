# Watch Next - Full Stack Azure Container App

A full stack app to pass a movie name from a React TypeScript frontend to a Node TypeScript backend.

## Structure

- `frontend/`: Vite + React + TypeScript
- `backend/`: Node.js + TypeScript (Express)
- Designed for Azure Container Apps deployment.

## Getting Started

1. Copy `.env.example` to `.env` (both frontend and backend).
2. Install dependencies:
    - `cd frontend && npm install`
    - `cd backend && npm install`
3. Run in development:
    - Backend: `cd backend && npm run dev`
    - Frontend: `cd frontend && npm run dev`
4. Deploy with Docker or to Azure Container Apps.

## Environment Variables

See `.env.example` in both folders.