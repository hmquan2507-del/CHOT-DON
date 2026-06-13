# Database

## profiles

- id
- email
- full_name
- plan
- created_at

## channels

- id
- user_id
- name
- platform
- niche
- goal
- audience
- content_style
- experience
- created_at

## products

- id
- user_id
- channel_id
- name
- price
- commission
- affiliate_link
- strengths
- target_audience
- notes
- created_at

## content_ideas

- id
- user_id
- channel_id
- product_id
- title
- hook
- angle
- cta
- caption
- hashtags
- status
- created_at

## scripts

- id
- user_id
- idea_id
- duration
- hook
- scenes
- voiceover
- text_on_screen
- cta
- created_at

## calendar_items

- id
- user_id
- idea_id
- script_id
- scheduled_date
- status
- notes
- created_at

## video_metrics

- id
- user_id
- idea_id
- video_url
- posted_at
- views
- likes
- comments
- shares
- clicks
- orders
- revenue
- notes
- created_at

channels.ai_positioning_result: lưu kết quả AI định vị kênh dạng JSON.
channels.ai_positioning_generated_at: thời điểm AI tạo định vị gần nhất.

product_imports = bảng lưu link import sản phẩm, chuẩn bị cho Smart Product Import, metadata extraction và scraping adapter sau này.