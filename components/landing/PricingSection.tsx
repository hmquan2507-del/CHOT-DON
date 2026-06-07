import PricingCard from "./PricingCard";
import { pricingPlans } from "./landing-data";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-black leading-tight tracking-[-0.055em] sm:text-5xl">
          Bắt đầu nhỏ. Bán được rồi mới mở rộng.
        </h2>
        <p className="mt-5 text-base leading-8 text-white/55">
          V1 có thể bán thủ công trước. Khi có người dùng thật, mới tích hợp
          thanh toán, giới hạn AI usage và subscription.
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {pricingPlans.map((plan) => (
          <PricingCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            desc={plan.desc}
            items={plan.items}
            featured={plan.featured}
          />
        ))}
      </div>
    </section>
  );
}
