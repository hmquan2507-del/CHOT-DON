import ProductToContentSection from "../workflow/ProductToContentSection";
import TrackingSection from "../workflow/TrackingSection";

export default function WorkflowEngineSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_35%,rgba(16,185,129,0.10),transparent_26%),radial-gradient(circle_at_100%_72%,rgba(16,185,129,0.12),transparent_28%)]" />
      <div className="pointer-events-none absolute left-0 top-[160px] h-[260px] w-[120px] bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />
      <div className="pointer-events-none absolute right-0 top-[860px] h-[260px] w-[120px] bg-[radial-gradient(circle,#cbd5e1_1px,transparent_1px)] bg-[size:12px_12px] opacity-40" />

      <div className="relative z-10">
        <ProductToContentSection />
        <TrackingSection />
      </div>
    </section>
  );
}