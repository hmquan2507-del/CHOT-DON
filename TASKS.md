# TASKS.md

## Current Phase

Phase 4.5 — AI Product Enrichment

## Goal

Add AI-assisted product enrichment to Smart Product Import.

The user should paste a product/affiliate link and optional notes. The system already attempts metadata extraction from Phase 4.4B. In this phase, AI will use the available metadata, pasted URL, user notes, and channel profile context to suggest richer product fields.

The user must review and confirm before saving the final product.

## Existing Flow

Phase 4.4A:

* User pastes product/affiliate URL.
* ProductForm opens with affiliate_url and notes prefilled.

Phase 4.4B:

* Server attempts metadata extraction.
* ProductForm can be prefilled with name, notes, affiliate_url.
* If metadata fails, fallback still works.

## New Flow for Phase 4.5

1. User goes to `/app/products`.
2. User uses `Nhập sản phẩm bằng link`.
3. User pastes product/affiliate URL.
4. User optionally adds notes.
5. User clicks `Lấy thông tin sản phẩm`.
6. Server extracts metadata if possible.
7. User can click `AI gợi ý thông tin bán hàng` or the import flow can automatically run enrichment after metadata extraction.
8. AI returns suggested product fields.
9. ProductForm opens with AI-enriched default values.
10. User reviews and edits all fields.
11. User saves final product into existing `products` table.

## AI Provider

Use server-side AI only.

Preferred for this phase:

* OpenAI API if OPENAI_API_KEY is available
* Or Gemini API if GEMINI_API_KEY is already used in the project

Do not call AI from client components.

Do not expose API keys in frontend.

## Important Product Rules

AI can suggest:

* product name
* category
* strengths
* target_customer
* notes
* content angles
* hook ideas
* CTA ideas

AI must not invent:

* price
* commission
* affiliate URL
* image URL
* fake reviews
* medical/health claims
* guaranteed results
* platform policy claims

If price/commission are not available, leave them empty.

## Data Sources for AI

AI input should include:

* pasted product URL
* source domain
* metadata title
* metadata description
* user notes
* current channel profile if available
* existing product fields if any

## Output Shape

AI should return structured JSON.

Suggested type:

```ts
export type AIProductEnrichmentResult = {
  name: string;
  category: string;
  strengths: string;
  target_customer: string;
  notes: string;
  content_angles: string[];
  hook_examples: string[];
  cta_examples: string[];
  confidence: "high" | "medium" | "low";
};
```

## Database

No database schema change is required for this phase.

Use existing tables:

* products
* product_imports
* channels

Optional:

* If ai_runs table already exists, log AI run.
* If ai_runs does not exist, do not create it in this phase unless explicitly requested.

## Not In Scope

Do not implement:

* Product scraping adapter 4.4C
* Playwright
* Puppeteer
* CAPTCHA bypass
* Proxy scraping
* Image generation
* Video generation
* BYOK
* Billing/credits
* Route refactor
* Workspace/multi-tenant refactor
* Database schema migration unless absolutely required

## Allowed Files

You may modify:

* actions/product-imports.ts
* components/app/products/ProductImportCard.tsx
* components/app/products/ProductForm.tsx only if needed
* lib/product-import/*
* types/product-import.ts
* lib/ai/* if already exists

You may create:

* lib/ai/product-enrichment.ts
* lib/ai/schemas/product-enrichment.ts
* lib/ai/prompts/product-enrichment.ts
* types/ai-product-enrichment.ts

## Forbidden Files

Do not modify:

* app/page.tsx
* components/landing/*
* app/(auth)/*
* components/auth/*
* app/app/channel/*
* actions/channels.ts
* actions/products.ts unless absolutely required
* lib/supabase/*
* database schema
* package.json unless absolutely required
* next.config.ts unless absolutely required

## UI Requirements

ProductImportCard should show:

* URL input
* Notes textarea
* Button: `Lấy thông tin sản phẩm`
* AI enrichment state:

  * `AI đang gợi ý thông tin...`
  * `AI đã gợi ý xong. Vui lòng kiểm tra trước khi lưu.`
  * `AI chưa thể gợi ý. Bạn vẫn có thể nhập thủ công.`

The final ProductForm should be prefilled with:

* affiliate_url from pasted URL
* name from metadata or AI
* notes from metadata/user notes/AI
* category from AI
* strengths from AI
* target_customer from AI

Keep current Product Library UI style.

Do not redesign the entire page.

## Technical Rules

* Do not use localStorage.
* AI must run server-side only.
* Validate AI output before using it.
* Fallback must work if AI fails.
* User must always be able to manually edit before saving.
* Existing add/edit/delete product flows must continue working.
* Existing 4.4A and 4.4B import flows must continue working.
* Run `npm run build` after changes.

## Success Criteria

* User can paste URL.
* Metadata extraction still works.
* AI enrichment suggests category, strengths, target_customer, notes.
* ProductForm opens with AI-enriched fields.
* User can edit fields before saving.
* Product saves to Supabase products.
* Existing add/edit/delete product flows still work.
* If AI key is missing or API fails, fallback still works.
* `npm run build` passes.
