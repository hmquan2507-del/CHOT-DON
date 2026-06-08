import Link from "next/link";
import { registerAction } from "../actions";

type RegisterPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (!error) {
    return null;
  }

  const messages: Record<string, string> = {
    "missing-fields": "Vui lòng nhập đầy đủ họ tên, email và mật khẩu.",
    "weak-password": "Mật khẩu nên có ít nhất 6 ký tự.",
  };

  return messages[error] || decodeURIComponent(error);
}

export default async function RegisterPage({
  searchParams,
}: RegisterPageProps) {
  const params = await searchParams;

  const errorMessage = getErrorMessage(params.error);

  return (
    <main className="min-h-screen bg-[#F6FBF6] px-4 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_460px]">
          <section className="hidden lg:block">
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
              AI Content Planner
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-slate-950">
              Tạo nền tảng xây kênh bán hàng bài bản từ ngày đầu tiên.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Phù hợp cho người mới làm TikTok Shop, affiliate, Reels, Shorts
              hoặc xây thương hiệu cá nhân bằng nội dung ngắn.
            </p>

            <div className="mt-8 rounded-[28px] border border-emerald-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">
                Sau khi đăng ký, bạn có thể:
              </p>

              <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                <li>• Tạo hồ sơ kênh và định vị nội dung.</li>
                <li>• Lập kế hoạch nội dung 30 ngày.</li>
                <li>• Quản lý ý tưởng, sản phẩm và lịch đăng.</li>
              </ul>
            </div>
          </section>

          <section className="rounded-[32px] border border-emerald-100 bg-white p-6 shadow-[0_24px_80px_rgba(15,118,110,0.12)] sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Đăng ký
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Tạo tài khoản mới
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Bắt đầu xây hệ thống nội dung bán hàng của bạn với Content Chốt
                Đơn.
              </p>
            </div>

            {errorMessage ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <form action={registerAction} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="fullName"
                  className="text-sm font-medium text-slate-700"
                >
                  Họ và tên
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  placeholder="Nguyễn Văn A"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Tối thiểu 6 ký tự"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                Tạo tài khoản
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Đã có tài khoản?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Đăng nhập
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
