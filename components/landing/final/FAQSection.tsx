const faqs = [
  {
    icon: "👤",
    question: "Người mới có dùng được không?",
    answer:
      "Có. Giao diện đơn giản, có hướng dẫn từng bước và AI hỗ trợ bạn viết nội dung dễ dàng.",
  },
  {
    icon: "🛍",
    question: "Có dùng được cho affiliate không?",
    answer:
      "Có. Hệ thống được thiết kế riêng cho người làm affiliate, dễ dàng quản lý sản phẩm và tạo nội dung.",
  },
  {
    icon: "♪",
    question: "Có cần biết edit TikTok không?",
    answer:
      "Không cần. Bạn chỉ cần ý tưởng và script, việc còn lại AI sẽ hỗ trợ định hướng nội dung.",
  },
  {
    icon: "🗄",
    question: "Dữ liệu có lưu lại được lâu không?",
    answer:
      "Có. Dữ liệu được lưu trữ an toàn trên cloud, bạn có thể truy cập bất cứ lúc nào.",
  },
  {
    icon: "📱",
    question: "Dùng trên điện thoại được không?",
    answer:
      "Có. Ứng dụng web tối ưu trên mọi thiết bị, làm việc mọi lúc mọi nơi.",
  },
  {
    icon: "💳",
    question: "Có cần trả phí ngay không?",
    answer:
      "Không. Bạn có thể dùng thử 7 ngày hoàn toàn miễn phí, không cần nhập thẻ.",
  },
];

export default function FAQSection() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1180px]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-2xl text-emerald-600">
            ?
          </div>

          <h2 className="mt-5 text-[38px] font-black tracking-[-0.055em] text-slate-950 sm:text-[48px]">
            Câu hỏi thường gặp
          </h2>

          <p className="mt-3 text-[17px] text-slate-500">
            Giải đáp nhanh những thắc mắc phổ biến.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="flex items-center gap-4 rounded-2xl border border-emerald-100 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.04)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-xl ring-1 ring-emerald-100">
                {faq.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] font-black text-slate-950">
                  {faq.question}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-slate-500">
                  {faq.answer}
                </p>
              </div>

              <div className="text-2xl font-light text-emerald-500">+</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}