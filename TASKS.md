# TASKS.md

## Current Phase

Phase 4.4B — Product Link Metadata Extract

## Goal

Upgrade Smart Product Import so the app can extract basic metadata from a pasted product/affiliate URL.

The user should be able to paste a link, click a button, and the server will try to extract:

- title
- description
- image URL
- source domain

If metadata is found, prefill the ProductForm with:

- name = extracted title
- notes = extracted description or user notes
- affiliate_url = pasted URL

If metadata fails, the flow must still work like Phase 4.4A.

## Current Existing Flow

Phase 4.4A already works:

1. User pastes a product/affiliate URL.
2. User adds optional notes.
3. User opens a Sheet.
4. ProductForm is prefilled with affiliate_url and notes.
5. User fills remaining fields and saves product to Supabase.

Do not break this existing flow.

## New Flow for Phase 4.4B

1. User goes to `/app/products`.
2. User sees `Nhập sản phẩm bằng link`.
3. User pastes a product/affiliate URL.
4. User optionally adds notes.
5. User clicks `Lấy thông tin sản phẩm` or `Tạo bản nháp sản phẩm`.
6. Server-side action attempts to extract metadata from the URL.
7. If successful:
   - name is prefilled from metadata title.
   - notes is prefilled from metadata description plus optional user notes.
   - affiliate_url is prefilled with pasted URL.

8. If failed:
   - affiliate_url is still prefilled.
   - notes uses user notes.
   - UI shows a subtle warning/helper text.

9. User reviews and saves final product into `products`.

## Important Product Rule

Metadata is only a helper.

The final confirmed product data must still be saved to the existing `products` table after user confirmation.

Do not directly create a product from metadata without user review.

## Database

Use existing `product_imports` table if available.

Expected useful fields:

- user_id
- channel_id
- source_url
- source_domain
- status
- raw_title
- raw_description
- raw_image_url
- raw_metadata
- user_notes
- error_message
- created_product_id

For Phase 4.4B:

- Create an import record when user attempts metadata extraction.
- Store extracted metadata if available.
- Store error_message if metadata extraction fails.
- Do not block the user if extraction fails.

## Status Values

Use these statuses:

- pending: extraction started
- succeeded: metadata extracted
- failed: extraction failed
- needs_review: partial metadata found
- converted: user saved final product

## Not In Scope

Do not implement:

- Shopee/TikTok Shop deep scraping
- Browser automation
- Playwright
- Puppeteer
- Proxy scraping
- CAPTCHA bypass
- AI enrichment
- Gemini/OpenAI API
- Image generation
- Video generation
- BYOK
- Billing/credits
- New database schema beyond existing `product_imports`

## Allowed Files

You may modify:

- app/app/products/page.tsx
- components/app/products/ProductImportCard.tsx
- components/app/products/ProductForm.tsx only if needed
- actions/product-imports.ts
- types/product-import.ts
- lib/product-import/\*
- types/product.ts only if absolutely needed

You may create:

- actions/product-imports.ts
- types/product-import.ts
- lib/product-import/extract-metadata.ts
- lib/product-import/url.ts

## Forbidden Files

Do not modify:

- app/page.tsx
- components/landing/\*
- app/(auth)/\*
- components/auth/\*
- app/app/channel/\*
- actions/channels.ts
- lib/supabase/\*
- database schema
- package.json unless absolutely required

## Metadata Extraction Requirements

Create a server-side metadata extraction utility.

It should:

1. Validate URL.
2. Normalize URL.
3. Detect source domain.
4. Fetch the page server-side.
5. Parse basic metadata from returned HTML:
   - og:title
   - og:description
   - og:image
   - twitter:title
   - twitter:description
   - twitter:image
   - title
   - meta name="description"

6. Return a clean result object.

Suggested result type:

```ts
export type ProductMetadataResult = {
  sourceUrl: string;
  sourceDomain: string | null;
  title: string | null;
  description: string | null;
  imageUrl: string | null;
  rawMetadata: Record<string, string>;
};
```

## Fallback Rule

If metadata extraction fails, do not break the import flow.

Fallback values:

- affiliate_url = pasted URL
- notes = user notes
- name = empty

Show helper message:

`Không lấy được thông tin tự động. Bạn vẫn có thể nhập thủ công và lưu sản phẩm.`

## UI Requirements

ProductImportCard should remain clean and professional.

Add loading state:

- Button text while extracting: `Đang lấy thông tin...`

Add success state:

- `Đã lấy được thông tin cơ bản. Vui lòng kiểm tra trước khi lưu.`

Add fallback state:

- `Không lấy được thông tin tự động. Bạn vẫn có thể nhập thủ công.`

Keep current Product Library layout.

Do not redesign the whole page.

## ProductForm Requirements

ProductForm must still support:

1. Normal create mode.
2. Create mode with defaultValues from import.
3. Edit mode from Phase 4.3.

Priority rule:

- If product exists, use product values.
- Else if defaultValues exists, use defaultValues.
- Else empty create form.

Do not break existing add/edit/delete flows.

## Technical Rules

- Do not use localStorage.
- Do not call third-party APIs from client components.
- Metadata fetch must run server-side.
- Do not call AI APIs in this phase.
- Do not scrape with Playwright/Puppeteer.
- Keep TypeScript clean.
- Keep mobile responsive.
- Run `npm run build` after changes.

## Success Criteria

- User can paste a URL.
- Server attempts metadata extraction.
- If metadata is found, ProductForm opens with name/notes/affiliate_url prefilled.
- If metadata fails, ProductForm still opens with affiliate_url/notes.
- Existing add product flow still works.
- Existing edit product flow still works.
- Existing delete product flow still works.
- `npm run build` passes.
