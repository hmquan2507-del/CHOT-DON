# TASKS.md

## Current Phase

Phase 4.4A — Smart Product Import MVP

## Goal

Add a safe "Import product by link" flow to Product Library.

The user should be able to paste a product or affiliate link, add optional notes, and open a product form with the link and notes prefilled.

This phase is only the foundation. It does not scrape Shopee/TikTok Shop yet. It does not call AI yet.

## Product Flow

1. User goes to `/app/products`.
2. User sees a professional card/section named `Nhập sản phẩm bằng link`.
3. User pastes a product or affiliate URL.
4. User can add optional notes.
5. User clicks a button like `Tạo bản nháp sản phẩm`.
6. The app opens a Sheet with `ProductForm`.
7. `ProductForm` is in create mode.
8. The form is prefilled with:

   * `affiliate_url` = pasted link
   * `notes` = optional notes
9. User manually fills the remaining required fields:

   * name
   * price
   * category
   * commission if needed
   * strengths
   * target_customer
10. User saves the product.
11. Product is saved into Supabase `products`.
12. Existing add/edit/delete product flows must still work.

## Database

A new table `product_imports` may be used to store import attempts.

Purpose:

* Store pasted links.
* Store optional user notes.
* Track import status.
* Prepare for future metadata extraction and scraping phases.

Important:

* `products` remains the final confirmed product table.
* `product_imports` is only for import drafts/history.
* Do not replace the existing `products` table.

## Product Imports Table

Expected table:

* id
* user_id
* channel_id
* source_url
* source_domain
* status
* raw_title
* raw_description
* raw_image_url
* raw_price
* raw_currency
* raw_metadata
* user_notes
* error_message
* created_product_id
* created_at
* updated_at

For Phase 4.4A, only these fields are required in the UI/action:

* source_url
* source_domain
* user_notes
* status
* created_product_id if product is saved successfully

## Scope

Implement only Phase 4.4A:

* Import by link UI
* Save product import draft if needed
* Open ProductForm with default values
* Save final product into existing `products` table

## Not In Scope

Do not implement:

* Shopee scraping
* TikTok Shop scraping
* Browser automation
* Playwright
* Puppeteer
* Proxy scraping
* CAPTCHA bypass
* Metadata extraction
* AI enrichment
* Image generation
* Video generation
* BYOK API key
* Billing/credits
* Database changes outside `product_imports`

## Allowed Files

You may modify:

* app/app/products/page.tsx
* components/app/products/*
* actions/products.ts only if needed
* types/product.ts only if needed

You may create:

* actions/product-imports.ts
* types/product-import.ts
* components/app/products/ProductImportCard.tsx
* components/app/products/ProductImportSheet.tsx if needed

## Forbidden Files

Do not modify:

* app/page.tsx
* components/landing/*
* app/(auth)/*
* components/auth/*
* app/app/channel/*
* actions/channels.ts
* lib/supabase/*
* database schema except the approved `product_imports` table
* package.json unless absolutely required

## UI Requirements

The UI must be professional and match the current Product Library style.

Add a section/card:

Title:
`Nhập sản phẩm bằng link`

Subtitle:
`Dán link sản phẩm hoặc link affiliate để tạo nhanh bản nháp sản phẩm.`

Fields:

* Product URL

  * placeholder: `https://...`
* Notes

  * placeholder: `Ghi chú nhanh về sản phẩm, ưu điểm hoặc tệp khách hàng nếu có...`

Buttons:

* Primary: `Tạo bản nháp sản phẩm`
* Secondary or helper: `Bạn có thể chỉnh lại toàn bộ thông tin trước khi lưu.`

After clicking primary:

* Open a Sheet.
* Show ProductForm in create mode.
* Prefill affiliate_url and notes.
* Keep all other fields editable.

## ProductForm Requirements

ProductForm must support:

1. Create mode without default values.
2. Create mode with default values from import.
3. Edit mode from Phase 4.3.

Do not break existing behavior.

Suggested prop:

```ts
type ProductFormDefaultValues = {
  affiliate_url?: string;
  notes?: string;
  name?: string;
  price?: string | number;
  commission?: string | number;
  category?: string;
  strengths?: string;
  target_customer?: string;
};

type ProductFormProps = {
  channel?: Channel | null;
  product?: Product;
  defaultValues?: ProductFormDefaultValues;
};
```

If `product` exists, the form is edit mode.

If `product` does not exist but `defaultValues` exists, the form is create mode with prefilled values.

## Server Actions

If creating `actions/product-imports.ts`, include:

* createProductImport
* markProductImportConverted if needed

Rules:

* Must get current authenticated user.
* Must insert only for current user.
* Must not trust client user_id.
* Must revalidate `/app/products`.
* Must keep TypeScript clean.

## Technical Rules

* Do not use localStorage.
* Do not call third-party APIs from client components.
* Do not call AI APIs in this phase.
* Do not scrape external websites in this phase.
* Real product data must be stored in Supabase.
* Keep TypeScript clean.
* Keep mobile responsive.
* Keep current Product Library add/edit/delete flows working.
* Run `npm run build` after changes.

## Success Criteria

* `/app/products` shows an import-by-link card.
* User can paste a link.
* User can add notes.
* User can open a product creation Sheet.
* `affiliate_url` is prefilled.
* `notes` is prefilled.
* User can save final product to Supabase.
* Existing add product form still works.
* Existing edit product flow still works.
* Existing delete product flow still works.
* Build passes with `npm run build`.
