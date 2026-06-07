import {
  CalendarDays,
  Clapperboard,
  Layers3,
  LineChart,
  Target,
  Wand2,
  type LucideIcon,
} from "lucide-react";

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export const features: {
  icon: LucideIcon;
  title: string;
  desc: string;
}[] = [
  {
    icon: Target,
    title: "Channel DNA",
    desc: "Tạo định vị kênh, tệp người xem, giọng nội dung và hướng kiếm tiền rõ ràng.",
  },
  {
    icon: Layers3,
    title: "Affiliate Library",
    desc: "Lưu sản phẩm, hoa hồng, link affiliate và các góc nội dung có thể khai thác.",
  },
  {
    icon: Wand2,
    title: "AI Idea Engine",
    desc: "Tạo ý tưởng video theo ngách, sản phẩm, mục tiêu tăng view hoặc chốt đơn.",
  },
  {
    icon: Clapperboard,
    title: "Script Studio",
    desc: "Viết hook, cảnh quay, voice over, text on screen và CTA cho video ngắn.",
  },
  {
    icon: CalendarDays,
    title: "Content Calendar",
    desc: "Theo dõi nội dung từ ý tưởng, quay, edit, đăng bài đến tối ưu lại.",
  },
  {
    icon: LineChart,
    title: "Manual Metrics",
    desc: "Nhập view, like, comment, đơn hàng để AI gợi ý hướng nội dung tiếp theo.",
  },
];

export const workflow = [
  "Tạo hồ sơ kênh",
  "Thêm sản phẩm",
  "Tạo ý tưởng",
  "Viết script",
  "Lên lịch",
  "Đo hiệu quả",
];

export const marqueeItems = [
  "Tạo hồ sơ kênh",
  "Thêm sản phẩm affiliate",
  "AI tạo 30 ý tưởng",
  "Viết script ngắn",
  "Lên lịch đăng",
  "Theo dõi hiệu quả",
];

export const ideas = [
  "3 lỗi khiến video affiliate có view nhưng không ra đơn",
  "Cách biến một sản phẩm thành 10 video ngắn",
  "Review sản phẩm dưới 200k cho người mới",
  "Video đầu tiên cho người mới làm TikTok Shop Affiliate",
];

export const pricingPlans = [
  {
    name: "Free",
    price: "0đ",
    desc: "Dành cho người mới test flow xây kênh.",
    items: [
      "1 hồ sơ kênh",
      "5 sản phẩm affiliate",
      "10 ý tưởng mẫu",
      "3 script ngắn",
    ],
  },
  {
    name: "Starter",
    price: "99k",
    desc: "Dành cho người mới muốn có lịch đăng đều.",
    featured: true,
    items: [
      "1 hồ sơ kênh",
      "20 sản phẩm",
      "100 ý tưởng/tháng",
      "50 script/tháng",
      "Lịch nội dung 30 ngày",
    ],
  },
  {
    name: "Pro",
    price: "199k",
    desc: "Dành cho creator nhỏ muốn tối ưu nội dung.",
    items: [
      "3 hồ sơ kênh",
      "Không giới hạn sản phẩm",
      "300 script/tháng",
      "Theo dõi hiệu quả video",
      "AI gợi ý nội dung tiếp theo",
    ],
  },
];