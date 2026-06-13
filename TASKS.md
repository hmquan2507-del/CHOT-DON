# TASKS.md

## Current Phase

Phase 5 — AI Channel Positioning

## Goal

Add AI-powered channel positioning for the Channel Profile module.

The user already has a channel profile with:

* name
* platform
* experience_level
* niche
* goal
* target_audience
* content_style
* channel_status
* current_situation
* desired_positioning
* social links
* avatar

This phase adds an AI action that reads the current channel profile and generates a structured positioning strategy.

## User Flow

1. User goes to `/app/channel`.
2. User has already created or updated a channel profile.
3. User clicks a button:
   `AI tư vấn định vị kênh`
4. Server reads the current authenticated user and their channel.
5. Server sends channel data to AI.
6. AI returns structured positioning result.
7. System saves the result to Supabase.
8. UI displays a professional result card on `/app/channel`.

## AI Should Generate

AI result should include:

* positioning_statement
* target_audience_summary
* channel_angle
* tone_of_voice
* content_pillars
* starter_video_ideas
* cta_strategy
* mistakes_to_avoid
* next_steps
* confidence

Suggested type:

```ts
export type AIChannelPositioningResult = {
  positioning_statement: string;
  target_audience_summary: string;
  channel_angle: string;
  tone_of_voice: string;
  content_pillars: Array<{
    title: string;
    description: string;
    example_topics: string[];
  }>;
  starter_video_ideas: Array<{
    title: string;
    hook: string;
    format: string;
    goal: string;
  }>;
  cta_strategy: string[];
  mistakes_to_avoid: string[];
  next_steps: string[];
  confidence: "high" | "medium" | "low";
};
```

## Database

Use existing `channels` table.

Required columns:

* ai_positioning_result jsonb
* ai_positioning_generated_at timestamptz

If these columns do not exist, ask the user to run this SQL:

```sql
alter table public.channels
add column if not exists ai_positioning_result jsonb,
add column if not exists ai_positioning_generated_at timestamptz;
```

Do not create a new table in this phase.

## AI Provider

Use the same provider strategy as Phase 4.5:

* Prefer Gemini if GEMINI_API_KEY exists
* Otherwise support OpenAI if OPENAI_API_KEY exists
* AI must run server-side only
* Never expose API keys in client components

If no API key exists:

* Do not crash
* Show friendly fallback:
  `Chưa cấu hình API key AI. Vui lòng thêm GEMINI_API_KEY hoặc OPENAI_API_KEY.`

## Not In Scope

Do not implement:

* AI Content Ideas
* AI Script Generator
* AI Image/Video generation
* Product scraping
* BYOK
* Billing/credits
* Calendar
* Metrics
* Route refactor
* Workspace/multi-tenant refactor
* Database redesign

## Allowed Files

You may modify:

* app/app/channel/page.tsx
* actions/channels.ts
* components/app/channel/*
* types/channel.ts
* lib/ai/*

You may create:

* lib/ai/channel-positioning.ts
* lib/ai/prompts/channel-positioning.ts
* lib/ai/schemas/channel-positioning.ts
* types/ai-channel-positioning.ts
* components/app/channel/ChannelPositioningCard.tsx
* components/app/channel/ChannelPositioningButton.tsx

## Forbidden Files

Do not modify:

* app/page.tsx
* components/landing/*
* app/(auth)/*
* components/auth/*
* app/app/products/*
* actions/products.ts
* actions/product-imports.ts
* lib/supabase/*
* database schema except the approved channels columns
* package.json unless absolutely required
* next.config.ts unless absolutely required

## UI Requirements

On `/app/channel`, add a professional AI positioning section.

If no AI result exists:

* Show a card:
  Title: `AI tư vấn định vị kênh`
  Description: `Dựa trên hồ sơ kênh của bạn, AI sẽ đề xuất định vị, trụ cột nội dung và hướng phát triển phù hợp.`
  Button: `Tạo định vị bằng AI`

If AI result exists:

Show a polished card with:

* Positioning statement
* Target audience summary
* Channel angle
* Tone of voice
* Content pillars
* Starter video ideas
* CTA strategy
* Mistakes to avoid
* Next steps
* Generated date
* Button: `Tạo lại định vị`

Keep current Channel Profile UI style.

Do not redesign the entire channel page.

## Technical Rules

* Do not use localStorage.
* AI must run server-side only.
* Validate AI output before saving.
* If AI output is invalid, return a friendly error.
* User must be authenticated.
* User can only update their own channel.
* Do not trust client user_id.
* Keep TypeScript clean.
* Keep mobile responsive.
* Existing channel create/update/avatar/social links must continue working.
* Run `npm run build` after changes.

## Success Criteria

* User can click `Tạo định vị bằng AI`.
* AI generates structured positioning result.
* Result is saved to Supabase.
* Refresh page still shows AI result.
* User can regenerate positioning.
* Missing API key shows friendly error.
* Existing Channel Profile form still works.
* Existing avatar/social links still work.
* `npm run build` passes.
