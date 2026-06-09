import type { Product } from "@/types/product";
import { BarChart3, PieChart } from "lucide-react";

type CategoryDistributionItem = {
  category: string;
  count: number;
  percent: number;
};

type ProductAnalyticsProps = {
  products: Product[];
  categoryDistribution: CategoryDistributionItem[];
  topCommissionProducts: Product[];
};

function toNumber(value: number | string | null | undefined) {
  const parsedValue = Number(value ?? 0);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
}

export default function ProductAnalytics({
  products,
  categoryDistribution,
  topCommissionProducts,
}: ProductAnalyticsProps) {
  if (products.length === 0) {
    return (
      <section className="rounded-[24px] border border-slate-200/60 bg-white p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <BarChart3 className="h-8 w-8" />
          </div>

          <h2 className="mt-5 text-xl font-black text-slate-950">
            Chưa có dữ liệu phân tích
          </h2>

          <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
            Thêm sản phẩm để hệ thống tự động tổng hợp và phân tích theo ngách,
            cũng như gợi ý các sản phẩm tiềm năng nhất.
          </p>
        </div>
      </section>
    );
  }

  const maxCommission = Math.max(
    ...topCommissionProducts.map((product) => toNumber(product.commission)),
    1,
  );

  let cumulativePercent = 0;
  const colors = ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0", "#d1fae5", "#ecfdf5"];
  
  const gradients = categoryDistribution.map((item, i) => {
    const color = colors[i % colors.length];
    const start = cumulativePercent;
    const end = cumulativePercent + item.percent;
    cumulativePercent = end;
    // For a single category, we want a full circle
    if (categoryDistribution.length === 1) {
       return `${color} 0% 100%`;
    }
    return `${color} ${start}% ${end}%`;
  });
  
  const conicStyle = {
    background: categoryDistribution.length > 0 
      ? `conic-gradient(${gradients.join(", ")})` 
      : "#f1f5f9"
  };

  return (
    <section className="rounded-[24px] border border-slate-200/60 bg-white p-6 sm:p-8 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <PieChart className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Phân bổ theo ngách
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Tỷ trọng danh mục sản phẩm
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 flex-1 justify-center">
            <div className="relative flex h-[160px] w-[160px] shrink-0 items-center justify-center rounded-full shadow-sm" style={conicStyle}>
              <div className="h-[100px] w-[100px] rounded-full bg-white flex flex-col items-center justify-center shadow-inner">
                <span className="text-2xl font-black text-slate-900">{products.length}</span>
                <span className="text-[10px] font-bold uppercase text-slate-400">Total</span>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3">
              {categoryDistribution.map((item, index) => (
                <div key={item.category} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span 
                      className="h-3 w-3 rounded-full" 
                      style={{ backgroundColor: colors[index % colors.length] }}
                    />
                    <span className="text-sm font-bold text-slate-700">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-sm font-black text-slate-950">
                    {item.percent}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-10 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <BarChart3 className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Sản phẩm tiềm năng nhất
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Top 5 sản phẩm theo hoa hồng
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center flex-1 space-y-5">
            {topCommissionProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                <p className="text-sm font-bold text-slate-600">
                  Chưa có sản phẩm nào có tỷ lệ hoa hồng.
                </p>
              </div>
            ) : (
              topCommissionProducts.map((product) => {
                const commission = toNumber(product.commission);
                const width = Math.max((commission / maxCommission) * 100, 8);

                return (
                  <div key={product.id}>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <p className="line-clamp-1 text-sm font-bold text-slate-700">
                        {product.name}
                      </p>
                      <p className="text-sm font-black text-emerald-700">
                        {commission.toFixed(1)}%
                      </p>
                    </div>

                    <div className="h-3.5 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-sm"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
