import type { ReactNode } from "react";

type AuthShellProps = {
  left: ReactNode;
  right: ReactNode;
};

export default function AuthShell({ left, right }: AuthShellProps) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F7F4EC] text-[#081226]">
      <div className="relative min-h-screen px-5 py-8 sm:px-8 lg:px-12 lg:py-10">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_24%,rgba(207,246,229,0.95),transparent_42%),radial-gradient(circle_at_0%_100%,rgba(14,169,104,0.16),transparent_34%)]" />

          <div className="absolute -right-32 -top-32 h-[760px] w-[760px] rounded-full bg-[#CFF6E5]/70 blur-[70px]" />

          <div className="absolute -bottom-56 -left-44 h-[560px] w-[560px] rounded-full bg-[#0EA968]/20 blur-[90px]" />

          <div className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,rgba(21,36,57,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,36,57,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />

          <div className="absolute bottom-[-180px] left-[-140px] h-[520px] w-[520px] rounded-full border border-white/40" />
          <div className="absolute bottom-[-230px] left-[-180px] h-[640px] w-[640px] rounded-full border border-white/30" />
        </div>

        <div className="relative mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-[1344px] items-center gap-12 lg:grid-cols-[minmax(560px,1fr)_520px] lg:gap-16">
          {left}

          <section className="flex justify-center lg:justify-end">
            {right}
          </section>
        </div>
      </div>
    </main>
  );
}