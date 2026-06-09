import Link from "next/link";
import {
  BarChart3,
  FileText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import MiniStatsCard from "./MiniStatsCard";
import SocialProofCard from "./SocialProofCard";

type AuthVariant = "login" | "register";

type Benefit = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type AuthHeroProps = {
  variant: AuthVariant;
};

const authHeroContent: Record<
  AuthVariant,
  {
    headingPrefix: string;
    highlight: string;
    description: string;
    benefits: Benefit[];
  }
> = {
  login: {
    headingPrefix: "Đăng nhập để tiếp tục xây hệ thống",
    highlight: "nội dung chốt đơn.",
    description:
      "Truy cập workspace của bạn để tạo kế hoạch nội dung, viết script, quản lý kênh và đo lường hiệu quả dễ dàng.",
    benefits: [
      {
        title: "AI đồng hành thông minh",
        description: "Gợi ý ý tưởng, lập kế hoạch và viết nội dung chất lượng.",
        icon: Sparkles,
      },
      {
        title: "Quản lý tập trung",
        description: "Theo dõi hiệu suất, lịch đăng và kênh trên một nơi.",
        icon: BarChart3,
      },
      {
        title: "Bảo mật & an toàn",
        description: "Dữ liệu của bạn luôn được bảo vệ tuyệt đối.",
        icon: ShieldCheck,
      },
    ],
  },
  register: {
    headingPrefix: "Tạo tài khoản để bắt đầu xây hệ thống",
    highlight: "nội dung chốt đơn.",
    description:
      "Tạo workspace, lên kế hoạch nội dung, viết script với AI và phát triển kênh nội dung bán hàng hiệu quả, bền vững.",
    benefits: [
      {
        title: "Lên kế hoạch thông minh",
        description:
          "AI gợi ý ý tưởng, lập kế hoạch và lịch đăng tối ưu theo mục tiêu.",
        icon: Sparkles,
      },
      {
        title: "Viết nội dung chốt đơn",
        description:
          "AI hỗ trợ viết script, tiêu đề, mô tả và CTA thu hút hơn.",
        icon: FileText,
      },
      {
        title: "Tăng trưởng kênh bền vững",
        description:
          "Đo lường hiệu suất và cải thiện liên tục để tăng chuyển đổi.",
        icon: TrendingUp,
      },
    ],
  },
};

export default function AuthHero({ variant }: AuthHeroProps) {
  const content = authHeroContent[variant];

  return (
    <section className="relative">
      <div className="max-w-[660px]">
        <Link
          href="/"
          className="inline-flex w-fit cursor-pointer items-center gap-4 rounded-2xl transition hover:opacity-90"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#0FA968] text-white shadow-[0_16px_34px_rgba(14,169,104,0.24)]">
            <Sparkles className="h-5 w-5" strokeWidth={2.7} />
          </div>

          <span className="text-[20px] font-extrabold tracking-[-0.035em] text-[#091224]">
            Content Chốt Đơn
          </span>
        </Link>

        <div className="mt-14 inline-flex h-12 items-center gap-3 rounded-full border border-[#DDEEE4] bg-white/75 px-5 shadow-[0_12px_34px_rgba(16,54,40,0.05)] backdrop-blur-md">
          <span className="flex h-5 w-5 items-center justify-center rounded-full text-[#0EA968]">
            <Sparkles className="h-4 w-4" strokeWidth={2.7} />
          </span>

          <span className="text-[14px] font-semibold text-[#51627C]">
            Nền tảng AI giúp bạn xây hệ thống nội dung bán hàng
          </span>
        </div>

        <h1 className="mt-10 max-w-[560px] text-[40px] font-black leading-[1.04] tracking-[-0.045em] text-[#081226] sm:text-[48px] lg:text-[56px]">
          {content.headingPrefix}{" "}
          <span className="text-[#0EA968]">{content.highlight}</span>
        </h1>

        <p className="mt-6 max-w-[520px] text-[16px] font-medium leading-[1.7] text-[#64748B] lg:text-[17px]">
          {content.description}
        </p>

        <div className="mt-10 space-y-5">
          {content.benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div key={benefit.title} className="group flex items-start gap-4">
                <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-[#CFEFDD] bg-[#ECFAF2] text-[#0EA968] shadow-[0_10px_28px_rgba(14,169,104,0.08)] transition group-hover:-translate-y-0.5 group-hover:border-[#AEE7C8] group-hover:shadow-[0_16px_34px_rgba(14,169,104,0.12)]">
                  <Icon className="h-6 w-6" strokeWidth={2.2} />
                </div>

                <div className="pt-1">
                  <h3 className="text-[18px] font-extrabold leading-tight text-[#0A1428] lg:text-[20px]">
                    {benefit.title}
                  </h3>

                  <p className="mt-1 text-[14px] font-medium leading-[1.55] text-[#6B7A90] lg:text-[15px]">
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative mt-12 hidden h-[100px] max-w-[670px] sm:block">
          <SocialProofCard />

          <div className="absolute left-[550px] top-[-350px] hidden xl:block">
            <MiniStatsCard />
          </div>
        </div>
      </div>
    </section>
  );
}