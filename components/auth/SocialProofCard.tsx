const avatars = [
  { label: "M", className: "bg-[#F8CFC2] text-[#7C2D12]" },
  { label: "A", className: "bg-[#DBEAFE] text-[#1D4ED8]" },
  { label: "K", className: "bg-[#E9D5FF] text-[#7E22CE]" },
  { label: "T", className: "bg-[#DCFCE7] text-[#15803D]" },
];

export default function SocialProofCard() {
  return (
    <div className="flex h-24 w-full max-w-[430px] items-center rounded-3xl border border-[#E5EFE8] bg-white/90 px-6 shadow-[0_24px_60px_rgba(16,54,40,0.08)] backdrop-blur-md">
      <div className="flex items-center">
        {avatars.map((avatar, index) => (
          <div
            key={avatar.label}
            className={`-ml-2 flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white text-[13px] font-black first:ml-0 ${avatar.className}`}
            style={{ zIndex: 10 - index }}
          >
            {avatar.label}
          </div>
        ))}

        <div className="-ml-2 flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-[#0EA968] text-[14px] font-black text-white">
          +2K
        </div>
      </div>

      <div className="ml-6">
        <div className="flex items-center gap-4">
          <div className="flex text-[#F6B400]">
            {Array.from({ length: 5 }).map((_, index) => (
              <svg
                key={index}
                className="h-5 w-5 fill-current"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10 1.5 12.63 6.83l5.88.86-4.26 4.15 1.01 5.86L10 14.93 4.74 17.7l1.01-5.86L1.49 7.69l5.88-.86L10 1.5Z" />
              </svg>
            ))}
          </div>

          <span className="text-[17px] font-black text-[#081226]">4.9/5</span>
        </div>

        <p className="mt-2 text-[15px] font-medium text-[#64748B]">
          Hơn 2.000 creators tin dùng mỗi ngày
        </p>
      </div>
    </div>
  );
}