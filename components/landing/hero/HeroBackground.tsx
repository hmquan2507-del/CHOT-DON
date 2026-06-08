export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(115deg,#FFFDF4_0%,#FFF9E9_43%,#ECFDF5_74%,#CFF7E8_100%)]" />

      <div className="absolute right-[-10rem] top-[-11rem] size-[58rem] rounded-full bg-emerald-300/28 blur-3xl" />
      <div className="absolute right-[-16rem] bottom-[-18rem] size-[48rem] rounded-full bg-teal-300/22 blur-3xl" />
      <div className="absolute left-[-18rem] top-[30%] size-[34rem] rounded-full bg-yellow-100/45 blur-3xl" />

      <div className="absolute right-0 top-0 h-full w-[58%] bg-[radial-gradient(circle_at_65%_20%,rgba(16,185,129,0.22),transparent_38%)]" />

      <div className="absolute inset-y-0 right-0 w-[60%] opacity-[0.18] [background-image:linear-gradient(to_right,rgba(15,23,42,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.16)_1px,transparent_1px)] [background-size:52px_52px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />

      <svg
        className="absolute right-0 top-0 h-full w-[62%] opacity-35"
        viewBox="0 0 900 860"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M40 560C170 410 305 520 430 360C560 192 690 285 850 70"
          stroke="url(#hero-line-1)"
          strokeWidth="1.15"
        />
        <path
          d="M95 748C255 572 405 640 548 470C680 314 752 270 910 182"
          stroke="url(#hero-line-2)"
          strokeWidth="1"
        />
        <path
          d="M248 790C430 650 560 694 700 520C800 398 858 366 930 342"
          stroke="url(#hero-line-3)"
          strokeWidth="0.9"
        />
        <circle cx="480" cy="322" r="4" fill="white" />
        <circle cx="725" cy="196" r="3.5" fill="white" />
        <defs>
          <linearGradient id="hero-line-1" x1="40" y1="560" x2="850" y2="70">
            <stop stopColor="#10B981" stopOpacity="0" />
            <stop offset="0.52" stopColor="#10B981" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-line-2" x1="95" y1="748" x2="910" y2="182">
            <stop stopColor="#14B8A6" stopOpacity="0" />
            <stop offset="0.52" stopColor="#14B8A6" />
            <stop offset="1" stopColor="#14B8A6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hero-line-3" x1="248" y1="790" x2="930" y2="342">
            <stop stopColor="#34D399" stopOpacity="0" />
            <stop offset="0.52" stopColor="#34D399" />
            <stop offset="1" stopColor="#34D399" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-[-7rem] right-[5%] h-56 w-[48rem] rounded-[100%] bg-emerald-500/12 blur-2xl" />
    </div>
  );
}