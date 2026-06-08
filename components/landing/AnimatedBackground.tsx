export default function AnimatedBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#fffdf4_0%,#fbfbf3_36%,#ecfdf5_100%)]" />

      <div className="pointer-events-none absolute right-[-18%] top-[-20%] h-[780px] w-[780px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.24)_0%,rgba(110,231,183,0.12)_42%,transparent_72%)] blur-xl" />

      <div className="pointer-events-none absolute bottom-[-24%] right-[10%] h-[520px] w-[760px] rounded-full bg-[radial-gradient(ellipse,rgba(5,150,105,0.24)_0%,rgba(110,231,183,0.12)_44%,transparent_74%)] blur-2xl" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] bg-[linear-gradient(rgba(6,95,70,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(6,95,70,0.045)_1px,transparent_1px)] bg-[size:52px_52px] [mask-image:radial-gradient(circle_at_62%_24%,black_0%,transparent_62%)]" />

      <div className="pointer-events-none absolute right-[-9%] top-[13%] h-[760px] w-[760px] rounded-full border border-emerald-700/10 border-l-transparent border-b-transparent rotate-[-18deg]" />

      <div className="pointer-events-none absolute right-[-4%] top-[23%] h-[600px] w-[600px] rounded-full border border-emerald-700/10 border-l-transparent border-b-transparent rotate-[-12deg]" />

      <div className="pointer-events-none absolute bottom-[10%] left-[38%] h-3 w-3 rounded-full bg-white shadow-[0_0_30px_rgba(16,185,129,0.75)]" />
    </>
  );
}