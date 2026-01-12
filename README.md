# Gymtime

Gymtime is a small web app that generates and displays workout plans using OpenAI. It provides a simple UI to choose muscle groups, generate workouts, and save or view generated workouts.

Features
- Generate workouts using OpenAI
- Select muscle groups and customize workout parameters
- Save and view previously generated workouts

Tech stack
- Vite + React + TypeScript
- OpenAI API (via a small backend wrapper)

Prerequisites
- Node.js 16+ and npm

Environment
Create a `.env` file in the project root and set your OpenAI API key:

```bash
VITE_OPENAI_API_KEY="your-openai-api-key-here"
```

Replace `your-openai-api-key-here` with the API key provided to you. On Windows PowerShell you can create the file with:

```powershell
echo VITE_OPENAI_API_KEY="your-openai-api-key-here" > .env
```

Install and run

```bash
npm install
npm run dev
```

This will start the Vite development server (default: http://localhost:5173).

Project structure (high level)
- `src/` — React app source
- `src/components/` — UI components (forms, header, generated workout view, etc.)
- `api/` — small server or API helpers (OpenAI wrapper)
- `shared/` — shared schemas and enums

Development notes
- The OpenAI calls are proxied through the code in `api/openai.ts` and `src/services/openAi.ts`.
- Schemas for exercises and workouts live in `shared/schemas/`.

Building for production

```bash
npm run build
```