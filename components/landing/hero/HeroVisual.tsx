import DashboardMockup from "./DashboardMockup";
import FloatingAiCard from "./FloatingAiCard";
import FloatingChannelCard from "./FloatingChannelCard";
import PhoneMockup from "./PhoneMockup";

export default function HeroVisual() {
  return (
    <div className="relative mx-auto h-[520px] w-full max-w-[740px] overflow-visible">
      {/* Glow nền sau dashboard */}
      <div className="pointer-events-none absolute left-1/2 top-[-28px] z-0 h-[520px] w-[680px] -translate-x-1/2 rounded-full bg-emerald-300/18 blur-3xl" />

      {/* Platform/glow dưới dashboard */}
      <div className="pointer-events-none absolute bottom-[12px] left-1/2 z-0 h-[86px] w-[78%] -translate-x-1/2 rounded-full bg-emerald-300/18 blur-[26px]" />
      <div className="pointer-events-none absolute bottom-[32px] left-1/2 z-0 h-[52px] w-[62%] -translate-x-1/2 rounded-full bg-gradient-to-b from-emerald-200/70 via-emerald-300/45 to-emerald-600/12" />
      <div className="pointer-events-none absolute bottom-[52px] left-1/2 z-0 h-[18px] w-[42%] -translate-x-1/2 rounded-full border border-white/70 bg-white/30 backdrop-blur-md" />

      {/* Dashboard chính - nằm giữa cột phải, không lấn sang phần chữ */}
      <div className="absolute left-1/2 top-[42px] z-20 w-[660px] -translate-x-1/2 xl:w-[700px]">
        <DashboardMockup />

        {/* Floating AI card */}
        <div className="absolute right-[62px] top-[78px] z-40 scale-[0.82]">
          <FloatingAiCard />
        </div>

        {/* Floating Beauty Care card */}
        <div className="absolute bottom-[18px] left-[24px] z-40 scale-[0.84]">
          <FloatingChannelCard />
        </div>

        {/* Phone mockup */}
<div className="absolute bottom-[-22px] right-[12px] z-50 xl:bottom-[-26px] xl:right-[6px]">
  <PhoneMockup />
</div>
      </div>
    </div>
  );
}