# TASKS.md

## Current Phase
Phase 4.3 — Product Library edit/delete + dashboard product count.

## Goal
Complete Product Library CRUD:
- Edit product
- Delete product
- Dashboard reads real product count from Supabase

## Allowed Files
- app/app/products/page.tsx
- components/app/products/*
- actions/products.ts only if needed
- app/app/page.tsx only for product count
- components/app/DashboardStatCard.tsx only if needed

## Forbidden Files
- components/landing/*
- app/page.tsx
- app/(auth)/*
- components/auth/*
- app/app/channel/*
- actions/channels.ts
- lib/supabase/*
- database schema

## Rules
- Do not use localStorage.
- Do not call AI API.
- Do not hardcode product count.
- Use existing Supabase products table.
- Keep current UI style.
- Run npm run build after changes.