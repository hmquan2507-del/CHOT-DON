import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Content Chốt Đơn — AI Content Planner cho bán hàng & affiliate",
  description:
    "Tạo hồ sơ kênh, quản lý sản phẩm, lên kế hoạch nội dung 30 ngày, viết script và theo dõi hiệu suất nội dung bán hàng.",
  applicationName: "Content Chốt Đơn",
  keywords: [
    "Content Chốt Đơn",
    "AI content planner",
    "TikTok affiliate",
    "YouTube Shorts",
    "Facebook Reels",
    "kịch bản video ngắn",
    "lập kế hoạch nội dung",
  ],
  openGraph: {
    title: "Content Chốt Đơn — AI Content Planner cho bán hàng & affiliate",
    description:
      "Tạo hồ sơ kênh, quản lý sản phẩm, lên kế hoạch nội dung 30 ngày, viết script và theo dõi hiệu suất nội dung bán hàng.",
    siteName: "Content Chốt Đơn",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={beVietnamPro.className}>{children}</body>
    </html>
  );
}