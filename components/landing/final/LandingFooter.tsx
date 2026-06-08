const productLinks = ["Tính năng", "Bảng giá", "AI Script", "Lịch nội dung", "Thống kê"];
const resourceLinks = ["Blog", "Hướng dẫn", "Template", "Cộng đồng", "Câu hỏi thường gặp"];
const companyLinks = ["Về chúng tôi", "Điều khoản", "Chính sách bảo mật", "Liên hệ", "Tuyển dụng"];

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: string[];
}) {
  return (
    <div>
      <h3 className="text-sm font-black text-slate-950">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm font-medium text-slate-500 hover:text-emerald-600">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function LandingFooter() {
  return (
    <footer className="border-t border-emerald-100 bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[1180px] gap-10 md:grid-cols-[1.3fr_0.7fr_0.7fr_0.7fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500 text-2xl text-white">
              ▤
            </div>
            <span className="text-[22px] font-black tracking-[-0.04em] text-slate-950">
              Content Chốt Đơn
            </span>
          </div>

          <p className="mt-4 max-w-[320px] text-sm leading-7 text-slate-500">
            AI đồng hành cùng bạn xây hệ thống nội dung chốt đơn mỗi ngày.
          </p>

          <div className="mt-5 flex gap-3">
            {["♪", "f", "◎", "▶"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-100 bg-white text-sm font-black text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Sản phẩm" links={productLinks} />
        <FooterColumn title="Tài nguyên" links={resourceLinks} />
        <FooterColumn title="Công ty" links={companyLinks} />
      </div>
    </footer>
  );
}