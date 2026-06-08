import Link from "next/link";
import { loginAction } from "../actions";

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    redirectedFrom?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (!error) {
    return null;
  }

  const messages: Record<string, string> = {
    "missing-fields": "Vui lòng nhập đầy đủ email và mật khẩu.",
    "invalid-credentials": "Email hoặc mật khẩu không đúng.",
  };

  return messages[error] || decodeURIComponent(error);
}

function getSuccessMessage(message?: string) {
  if (!message) {
    return null;
  }

  const messages: Record<string, string> = {
    "check-email":
      "Đăng ký thành công. Nếu Supabase bật xác nhận email, hãy kiểm tra email trước khi đăng nhập.",
  };

  return messages[message] || null;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  const errorMessage = getErrorMessage(params.error);
  const successMessage = getSuccessMessage(params.message);

  return (
    <main className="min-h-screen bg-[#F6FBF6] px-4 py-10 text-slate-950">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-6xl items-center justify-center">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_460px]">
          <section className="hidden lg:block">
            <div className="inline-flex rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm">
              Content Chốt Đơn
            </div>

            <h1 className="mt-6 max-w-2xl text-5xl font-semibold tracking-tight text-slate-950">
              Đăng nhập để quản lý kế hoạch nội dung bán hàng của bạn.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              Lên kế hoạch TikTok, YouTube Shorts, Facebook Reels, quản lý ý
              tưởng, kịch bản và lịch đăng trong một dashboard gọn gàng.
            </p>

            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {["Kế hoạch 30 ngày", "Kịch bản ngắn", "Gợi ý AI"].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-emerald-100 bg-white p-4 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-emerald-100 bg-white p-6 shadow-[0_24px_80px_rgba(15,118,110,0.12)] sm:p-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
                Đăng nhập
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">
                Chào mừng quay lại
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Nhập tài khoản để tiếp tục vào dashboard Content Chốt Đơn.
              </p>
            </div>

            {successMessage ? (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-6 text-emerald-800">
                {successMessage}
              </div>
            ) : null}

            {errorMessage ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-6 text-red-700">
                {errorMessage}
              </div>
            ) : null}

            <form action={loginAction} className="mt-8 space-y-5">
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
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-emerald-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
              >
                Đăng nhập
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-500">
              Chưa có tài khoản?{" "}
              <Link
                href="/register"
                className="font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Đăng ký ngay
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
