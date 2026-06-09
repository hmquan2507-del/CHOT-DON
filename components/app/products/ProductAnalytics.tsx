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
      <section className="rounded-[24px] border border-slate-200/80 bg-white p-8 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <BarChart3 className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-xl font-black text-slate-950">
            Chưa có dữ liệu phân tích
          </h2>

          <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
            Thêm sản phẩm để xem phân tích theo ngách và top sản phẩm theo hoa
            hồng.
          </p>
        </div>
      </section>
    );
  }

  const maxCommission = Math.max(
    ...topCommissionProducts.map((product) => toNumber(product.commission)),
    1,
  );

  return (
    <section className="rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <PieChart className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Phân bổ theo ngách
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Nhóm sản phẩm theo category
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {categoryDistribution.map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-bold text-slate-700">
                    {item.category}
                  </p>
                  <p className="text-sm font-black text-slate-950">
                    {item.percent}%
                  </p>
                </div>

                <div className="mt-2 h-3 rounded-full bg-slate-100">
                  <div
                    className="h-3 rounded-full bg-emerald-500"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <BarChart3 className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-black text-slate-950">
                Sản phẩm tiềm năng theo hoa hồng
              </h2>
              <p className="text-sm font-medium text-slate-500">
                Top 5 sản phẩm có % hoa hồng cao nhất
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {topCommissionProducts.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-5 text-sm font-medium text-slate-500">
                Chưa có sản phẩm nào có hoa hồng.
              </p>
            ) : (
              topCommissionProducts.map((product) => {
                const commission = toNumber(product.commission);
                const width = Math.max((commission / maxCommission) * 100, 8);

                return (
                  <div key={product.id}>
                    <div className="flex items-center justify-between gap-4">
                      <p className="line-clamp-1 text-sm font-bold text-slate-700">
                        {product.name}
                      </p>
                      <p className="text-sm font-black text-emerald-700">
                        {commission.toFixed(1)}%
                      </p>
                    </div>

                    <div className="mt-2 h-4 rounded-full bg-slate-100">
                      <div
                        className="h-4 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600"
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