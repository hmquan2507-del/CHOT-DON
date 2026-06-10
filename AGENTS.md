# AGENTS.md — Content Chốt Đơn

## Project
Content Chốt Đơn is a Next.js App Router SaaS app for creators, affiliate marketers, and small shops to build short-video sales channels.

Core flow:
Channel Profile → Product Library → AI Ideas → AI Scripts → Media Generation → Calendar → Metrics → AI Suggestions.

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Vercel
- Gemini/OpenAI API server-side only

## Current Rules
- Do not use localStorage for main data.
- Real data must be stored in Supabase.
- Do not call AI APIs from client components.
- Do not expose API keys in frontend.
- Keep UI professional, clean, modern SaaS.
- Mobile-first, but desktop dashboard must look polished.
- Do not modify files outside the requested scope.
- Always list modified files after changes.
- Always run or ask the user to run `npm run build`.

## Do Not Modify Unless Asked
- components/landing/*
- app/page.tsx
- app/(auth)/*
- components/auth/*
- lib/supabase/*
- database schema
- package.json

## UI Direction
- Font: Be Vietnam Pro
- Light SaaS interface
- Emerald / neutral / ivory / mint
- White cards
- Soft borders
- Soft shadows
- Rounded 22–24px cards
- No dark-heavy UI
- No vibe-code layout

## Development Workflow
Before editing:
1. Read related files.
2. Explain which files will be modified.
3. Stay within scope.

After editing:
1. List changed files.
2. Summarize changes.
3. Run or request:
   - npm run dev
   - npm run build
4. Provide commit command.