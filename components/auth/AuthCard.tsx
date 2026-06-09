import Link from "next/link";
import {
  ArrowRight,
  EyeOff,
  LockKeyhole,
  Mail,
  User,
  UserRoundPlus,
} from "lucide-react";
import AuthInput from "./AuthInput";
import AuthSocialButton from "./AuthSocialButton";

type AuthVariant = "login" | "register";

type AuthAction = (formData: FormData) => void | Promise<void>;

type AuthCardProps = {
  variant: AuthVariant;
  action: AuthAction;
  errorMessage?: string | null;
  successMessage?: string | null;
  redirectedFrom?: string;
};

export default function AuthCard({
  variant,
  action,
  errorMessage,
  successMessage,
  redirectedFrom,
}: AuthCardProps) {
  const isLogin = variant === "login";
  const Icon = isLogin ? LockKeyhole : UserRoundPlus;

  return (
    <div className="w-full max-w-[520px] rounded-[32px] border border-[#DDE6EC] bg-white/90 p-6 shadow-[0_30px_80px_rgba(16,54,40,0.12)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div className="mx-auto flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#E7FAF0] text-[#0EA968]">
        <Icon className="h-9 w-9" strokeWidth={2.4} />
      </div>

      <div className="mt-7 text-center">
        <h1 className="text-[44px] font-black leading-[1.05] tracking-[-0.045em] text-[#081226] lg:text-[52px]">
          {isLogin ? "Đăng nhập" : "Đăng ký"}
        </h1>

        <p className="mx-auto mt-3 max-w-[390px] text-[17px] font-medium leading-7 text-[#77839A] lg:text-[18px]">
          {isLogin
            ? "Chào mừng bạn quay trở lại Content Chốt Đơn!"
            : "Tạo tài khoản Content Chốt Đơn để bắt đầu quản lý kênh và nội dung."}
        </p>
      </div>

      {successMessage ? (
        <div className="mt-6 rounded-2xl border border-[#B9E9D0] bg-[#EFFBF4] px-4 py-3 text-[14px] font-semibold leading-6 text-[#12804D]">
          {successMessage}
        </div>
      ) : null}

      {errorMessage ? (
        <div className="mt-6 rounded-2xl border border-[#F2C7C7] bg-[#FFF4F4] px-4 py-3 text-[14px] font-semibold leading-6 text-[#C24141]">
          {errorMessage}
        </div>
      ) : null}

      <form action={action} className="mt-8 space-y-5">
        {isLogin && redirectedFrom ? (
          <input type="hidden" name="redirectedFrom" value={redirectedFrom} />
        ) : null}

        {!isLogin ? (
          <AuthInput
            id="fullName"
            name="fullName"
            type="text"
            label="Họ và tên"
            placeholder="Nhập họ và tên của bạn"
            icon={User}
            autoComplete="name"
          />
        ) : null}

        <AuthInput
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Nhập email của bạn"
          icon={Mail}
          autoComplete="email"
        />

        <AuthInput
          id="password"
          name="password"
          type="password"
          label="Mật khẩu"
          placeholder="Nhập mật khẩu"
          icon={LockKeyhole}
          rightIcon={EyeOff}
          autoComplete={isLogin ? "current-password" : "new-password"}
        />

        {isLogin ? (
          <div className="flex items-center justify-between gap-4 pt-1">
            <label className="inline-flex cursor-pointer items-center gap-3 text-[15px] font-semibold text-[#64748B] transition hover:text-[#0A1428]">
              <input
                type="checkbox"
                name="remember"
                defaultChecked
                className="h-[18px] w-[18px] cursor-pointer rounded border-[#C7D3DE] accent-[#0EA968]"
              />
              <span>Ghi nhớ đăng nhập</span>
            </label>

            <button
              type="button"
              className="cursor-pointer text-[15px] font-bold text-[#0EA968] transition hover:text-[#0C975D]"
            >
              Quên mật khẩu?
            </button>
          </div>
        ) : (
          <label className="flex cursor-pointer items-start gap-3 pt-1 text-[16px] font-semibold leading-6 text-[#64748B] transition hover:text-[#0A1428]">
            <input
              type="checkbox"
              name="terms"
              defaultChecked
              className="mt-1 h-[18px] w-[18px] cursor-pointer rounded border-[#C7D3DE] accent-[#0EA968]"
            />

            <span>
              Tôi đồng ý với{" "}
              <button
                type="button"
                className="cursor-pointer font-bold text-[#0EA968] transition hover:text-[#0C975D]"
              >
                điều khoản và chính sách
              </button>
            </span>
          </label>
        )}

        <button
          type="submit"
          className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#0EA968] text-[18px] font-extrabold text-white shadow-[0_18px_42px_rgba(14,169,104,0.25)] transition hover:-translate-y-0.5 hover:bg-[#0C975D] hover:shadow-[0_22px_48px_rgba(14,169,104,0.30)] active:translate-y-0"
        >
          <span>{isLogin ? "Đăng nhập" : "Tạo tài khoản"}</span>
          <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
        </button>

        <div className="flex items-center gap-4 pt-2">
          <div className="h-px flex-1 bg-[#E4EAF0]" />
          <span className="text-[14px] font-medium text-[#9AA6B7]">hoặc</span>
          <div className="h-px flex-1 bg-[#E4EAF0]" />
        </div>

        <AuthSocialButton />

        <p className="pt-1 text-center text-[16px] font-medium text-[#738198]">
          {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="cursor-pointer font-bold text-[#0EA968] transition hover:text-[#0C975D]"
          >
            {isLogin ? "Đăng ký" : "Đăng nhập"}
          </Link>
        </p>
      </form>
    </div>
  );
}