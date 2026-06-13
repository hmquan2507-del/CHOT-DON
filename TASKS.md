# TASKS.md

## Current Phase

Phase 6 — AI Content Ideas

## Goal

Create the Content Ideas module.

The user should be able to generate short-video content ideas using AI based on:

* Channel Profile
* AI Channel Positioning result
* Product Library
* Product AI enrichment data if available
* User-selected product
* User-selected goal/platform

The generated ideas must be reviewed by the user and saved into Supabase `content_ideas`.

## Existing Completed Phases

* Phase 3 — Channel Profile
* Phase 4.3 — Product Library edit/delete + dashboard product count
* Phase 4.4A — Product link import draft flow
* Phase 4.4B — Product metadata extraction
* Phase 4.5A — AI Product Enrichment Foundation
* Phase 5 — AI Channel Positioning

## User Flow

1. User goes to `/app/ideas`.
2. Page shows current ideas from Supabase.
3. User clicks `Tạo ý tưởng bằng AI`.
4. User selects:

   * Channel
   * Product optional
   * Platform
   * Goal
   * Number of ideas
5. Server reads:

   * current user
   * selected channel
   * channel.ai_positioning_result
   * selected product if any
   * recent products if no product selected
6. AI generates structured content ideas.
7. UI shows preview list.
8. User can save selected ideas.
9. Saved ideas are inserted into `content_ideas`.
10. Ideas remain after refresh.

## Database

Use table `content_ideas`.

Required fields:

* id
* user_id
* channel_id
* product_id
* title
* hook
* angle
* platform
* content_format
* goal
* target_audience
* cta
* hashtags
* notes
* source_type
* status
* priority
* ai_reason
* ai_raw_result
* created_at
* updated_at

If table does not exist, ask user to run the approved SQL migration before coding.

## AI Output

AI should return structured JSON.

Suggested type:

```ts
export type AIContentIdea = {
  title: string;
  hook: string;
  angle: string;
  platform: string;
  content_format: string;
  goal: string;
  target_audience: string;
  cta: string;
  hashtags: string[];
  notes: string;
  priority: "low" | "normal" | "high";
  reason: string;
};

export type AIContentIdeasResult = {
  ideas: AIContentIdea[];
  confidence: "high" | "medium" | "low";
};
```

## AI Rules

AI can generate:

* video idea title
* hook
* content angle
* content format
* CTA
* hashtag suggestions
* notes
* reason why this idea fits the channel/product

AI must not:

* invent fake product claims
* invent fake reviews
* promise guaranteed results
* create misleading medical/health claims
* create platform policy claims
* generate full video script in this phase

Full scripts belong to Phase 7.

## AI Provider

Use the same provider strategy already used in Phase 4.5A / Phase 5.

* Gemini if GEMINI_API_KEY is configured
* OpenAI if OPENAI_API_KEY is configured
* Server-side only
* Never expose API keys in client components

If no API key exists:

* Do not crash
* Show friendly message:
  `Chưa cấu hình API key AI. Vui lòng thêm GEMINI_API_KEY hoặc OPENAI_API_KEY.`

## Not In Scope

Do not implement:

* AI Script Generator
* Content Calendar
* Metrics
* AI Image Generation
* AI Video Generation
* Product scraping adapter 4.4C
* BYOK
* Billing/credits
* Route refactor
* Workspace/multi-tenant refactor
* Database redesign

## Allowed Files

You may modify:

* app/app/ideas/page.tsx
* components/app/ideas/*
* actions/content-ideas.ts
* types/content-idea.ts
* lib/ai/*

You may create:

* actions/content-ideas.ts
* types/content-idea.ts
* types/ai-content-ideas.ts
* lib/ai/content-ideas.ts
* lib/ai/prompts/content-ideas.ts
* lib/ai/schemas/content-ideas.ts
* components/app/ideas/ContentIdeaCard.tsx
* components/app/ideas/ContentIdeasList.tsx
* components/app/ideas/ContentIdeaGenerator.tsx
* components/app/ideas/ContentIdeasEmptyState.tsx
* components/app/ideas/ContentIdeaSaveButton.tsx if needed

## Forbidden Files

Do not modify:

* app/page.tsx
* components/landing/*
* app/(auth)/*
* components/auth/*
* app/app/channel/* unless absolutely required
* app/app/products/* unless absolutely required
* actions/products.ts
* actions/product-imports.ts
* actions/channels.ts
* lib/supabase/*
* database schema except approved content_ideas table
* package.json unless absolutely required
* next.config.ts unless absolutely required

## Page UI Requirements

Route:

`/app/ideas`

Page layout:

* Keep dashboard sidebar/topbar.
* Page title: `Ý tưởng nội dung`
* Subtitle: `Tạo và quản lý ý tưởng video ngắn dựa trên kênh, sản phẩm và định vị AI.`
* Top stats cards:

  * Tổng ý tưởng
  * Ý tưởng từ AI
  * Sẵn sàng làm kịch bản
  * Đã lên lịch / placeholder 0 if calendar not implemented
* Main section:

  * Left: ideas list/grid
  * Right: AI generator panel

## AI Generator Panel UI

Card title:

`Tạo ý tưởng bằng AI`

Fields:

* Channel select
* Product select optional
* Platform select:

  * TikTok
  * YouTube Shorts
  * Facebook Reels
* Goal select:

  * Bán hàng
  * Affiliate
  * Tăng nhận diện
  * Tăng tương tác
  * Giáo dục khách hàng
* Number of ideas:

  * 3
  * 5
  * 10

Button:

`Tạo ý tưởng`

Loading state:

`AI đang tạo ý tưởng...`

After generation:

* Show preview ideas
* Each idea has checkbox/select
* Button: `Lưu ý tưởng đã chọn`

## Ideas List UI

Each idea card should show:

* title
* hook
* angle
* product name if available
* platform
* goal
* priority badge
* status badge
* CTA
* hashtags
* source_type badge: AI / Thủ công
* action button:

  * `Dùng để viết kịch bản` disabled or placeholder for Phase 7
  * `Lưu trữ` or `Xóa` optional if easy

## Server Actions

Required actions:

* getContentIdeas or server query inside page
* generateContentIdeasAction
* saveGeneratedIdeasAction
* createManualContentIdeaAction optional
* updateContentIdeaStatusAction optional

Rules:

* Must get current authenticated user.
* Must not trust client user_id.
* Must only read/update current user data.
* Must use Supabase server client.
* Must revalidate `/app/ideas`.
* Must keep TypeScript clean.
* Must fallback gracefully if AI fails.

## Technical Rules

* Do not use localStorage.
* AI must run server-side only.
* Validate AI output before rendering/saving.
* User must review before saving.
* Existing Channel/Product modules must not break.
* Keep mobile responsive.
* Run `npm run build` after changes.

## Success Criteria

* `/app/ideas` loads.
* Existing saved ideas display.
* User can generate ideas with AI.
* AI preview renders.
* User can save selected generated ideas.
* Saved ideas persist after refresh.
* Missing API key shows friendly message.
* No raw JSON shown.
* No undefined/null shown.
* `npm run build` passes.
