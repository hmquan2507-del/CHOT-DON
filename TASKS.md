# TASKS.md

## Current Phase

Phase 6.2 — Ideas Management Features

## Goal

Hoàn thiện module `/app/ideas` để người dùng có thể quản lý ý tưởng nội dung thật sự hiệu quả trước khi chuyển sang Phase 7 — AI Script Generator.

Phase này tập trung vào:

* Tìm kiếm ý tưởng
* Lọc ý tưởng
* Sắp xếp ý tưởng
* Đánh dấu ý tưởng sẵn sàng viết kịch bản
* Lưu trữ ý tưởng
* Khôi phục ý tưởng đã lưu trữ
* Làm UI quản lý ý tưởng rõ ràng, dễ dùng, không rối

Không triển khai AI Script Generator trong phase này.

---

## Current Status

Đã hoàn thành:

* Phase 3 — Channel Profile
* Phase 4 — Product Library
* Phase 4.4 — Product Import by Link
* Phase 4.5 — AI Product Enrichment
* Phase 5 — AI Channel Positioning
* Phase 6 — AI Content Ideas
* `/app/ideas` đã có UI và lưu ý tưởng vào Supabase
* Sidebar đã có submenu cho Ideas
* Ideas UI đã được polish cơ bản

Hiện cần hoàn thiện phần quản lý dữ liệu trong Ideas.

---

## Database

Dùng bảng hiện có:

`content_ideas`

Các field chính:

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

Không thêm cột mới trong phase này.

---

## Required Features

### 1. Search Ideas

Thêm ô tìm kiếm:

Placeholder:

`Tìm ý tưởng, hook, CTA...`

Search nên tìm trong:

* title
* hook
* angle
* cta
* hashtags
* notes

Ưu tiên dùng URL search params:

Ví dụ:

* `/app/ideas?tab=all&q=giay`
* `/app/ideas?tab=all&q=review`

Không dùng localStorage.

---

### 2. Filter by Platform

Thêm filter nền tảng:

* Tất cả nền tảng
* TikTok
* YouTube Shorts
* Facebook Reels

URL param:

* `platform=TikTok`
* `platform=YouTube%20Shorts`
* `platform=Facebook%20Reels`

---

### 3. Filter by Status

Thêm filter trạng thái:

* Tất cả trạng thái
* Nháp
* Sẵn sàng
* Đã lên lịch
* Đã đăng
* Đã lưu trữ

Mapping:

* draft → Nháp
* ready → Sẵn sàng
* scheduled → Đã lên lịch
* published → Đã đăng
* archived → Đã lưu trữ

URL param:

* `status=draft`
* `status=ready`
* `status=archived`

---

### 4. Filter by Source Type

Thêm filter nguồn tạo:

* Tất cả nguồn
* AI
* Thủ công

Mapping:

* ai → AI
* manual → Thủ công

URL param:

* `source=ai`
* `source=manual`

---

### 5. Filter by Product

Nếu `/app/ideas` đã có hoặc có thể query products của user hiện tại, thêm filter sản phẩm:

* Tất cả sản phẩm
* Danh sách sản phẩm theo tên

URL param:

* `productId=<uuid>`

Không sửa logic Product Library.

---

### 6. Sort Ideas

Thêm sort:

* Mới nhất
* Cũ nhất
* Ưu tiên cao
* Sẵn sàng trước

URL param:

* `sort=newest`
* `sort=oldest`
* `sort=priority`
* `sort=ready`

Behavior:

* newest: created_at desc
* oldest: created_at asc
* priority: high → normal → low
* ready: ready ideas first

---

## Tabs

Giữ các tab:

* `/app/ideas?tab=all`
* `/app/ideas?tab=generate`
* `/app/ideas?tab=ready`
* `/app/ideas?tab=archived`

Rules:

* `tab=all`: hiển thị tất cả ý tưởng trừ archived mặc định
* `tab=generate`: hiển thị AI generator
* `tab=ready`: chỉ hiển thị status = ready
* `tab=archived`: chỉ hiển thị status = archived

Search/filter/sort áp dụng cho:

* tab=all
* tab=ready
* tab=archived

Không hiện archived trong tab all trừ khi user lọc rõ status archived.

---

## Server Actions

Cần có hoặc hoàn thiện:

* `markIdeaReadyAction`
* `archiveIdeaAction`
* `restoreIdeaAction`

Hoặc dùng action tổng quát:

* `updateContentIdeaStatusAction`

Rules:

* Luôn lấy authenticated user từ Supabase server client
* Không tin user_id từ client
* Chỉ update dữ liệu của current user
* Không xóa dữ liệu khi lưu trữ
* Archive chỉ đổi status thành `archived`
* Restore đổi status từ `archived` về `draft`
* Revalidate `/app/ideas`

---

## Idea Card Actions

Nếu status = draft:

* Hiển thị nút: `Đánh dấu sẵn sàng`

Nếu status = ready:

* Hiển thị nút disabled/placeholder: `Viết kịch bản — sắp có`
* Không triển khai Phase 7 trong phase này

Nếu status = archived:

* Hiển thị nút: `Khôi phục`

Với idea chưa archived:

* Hiển thị action: `Lưu trữ`

---

## Empty States

Khi không có kết quả search/filter:

Title:

`Không tìm thấy ý tưởng phù hợp`

Text:

`Thử đổi từ khóa, bộ lọc hoặc tạo thêm ý tưởng mới bằng AI.`

CTA:

`Tạo ý tưởng bằng AI`

Khi tab ready trống:

Title:

`Chưa có ý tưởng sẵn sàng viết kịch bản`

Text:

`Hãy chọn một ý tưởng nháp và đánh dấu sẵn sàng, hoặc tạo ý tưởng mới bằng AI.`

CTA:

`Tạo ý tưởng bằng AI`

Khi tab archived trống:

Title:

`Chưa có ý tưởng đã lưu trữ`

Text:

`Các ý tưởng bạn lưu trữ sẽ xuất hiện tại đây.`

---

## UI Requirements

Toolbar quản lý nên gồm:

* Search input
* Platform filter
* Product filter nếu có
* Status filter
* Source filter
* Sort select
* Clear filters action

UI phải:

* Gọn
* Dễ scan
* Không quá nhiều text
* Không render raw JSON
* Không hiện undefined/null
* Mobile responsive
* Modern SaaS dashboard
* White cards
* Emerald/mint accents
* Soft border
* Rounded 20px–24px

---

## Interaction Requirements

Mọi phần tử click được cần có:

* cursor-pointer
* hover state
* active:scale-[0.98]
* focus-visible:outline-none
* focus-visible:ring-2
* focus-visible:ring-emerald-500/30
* transition-all duration-200 ease-out

Disabled/loading:

* cursor-not-allowed
* opacity-50
* không có hover mạnh

Static cards:

* Không thêm cursor-pointer nếu không click được

---

## Technical Rules

* Không dùng localStorage
* Không thêm package mới
* Không đổi database schema
* Không đổi AI provider/prompt
* Không triển khai Phase 7
* Không sửa Product Library logic
* Không sửa Channel Profile logic
* Không sửa Landing/Auth

---

## Allowed Files

Có thể sửa:

* app/app/ideas/page.tsx
* components/app/ideas/*
* actions/content-ideas.ts
* types/content-idea.ts nếu cần type safety
* components/app/AppSidebar.tsx nếu cần polish active state nhỏ

---

## Forbidden Files

Không sửa:

* lib/ai/*
* lib/supabase/*
* actions/products.ts
* actions/channels.ts
* app/app/channel/*
* app/app/products/*
* app/page.tsx
* components/landing/*
* package.json
* database files or SQL

---

## Success Criteria

* `/app/ideas?tab=all` hoạt động
* Search hoạt động
* Platform filter hoạt động
* Status filter hoạt động
* Source filter hoạt động
* Product filter hoạt động nếu có sản phẩm
* Sort hoạt động
* Đánh dấu sẵn sàng hoạt động
* Lưu trữ hoạt động
* Khôi phục hoạt động
* Empty states rõ ràng
* Không có raw JSON
* Không có undefined/null
* `npm run build` pass
