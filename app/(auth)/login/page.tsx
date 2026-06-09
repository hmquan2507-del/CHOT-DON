import { loginAction } from "../actions";
import AuthCard from "../../../components/auth/AuthCard";
import AuthHero from "../../../components/auth/AuthHero";
import AuthShell from "../../../components/auth/AuthShell";

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

  return (
    <AuthShell
      left={<AuthHero variant="login" />}
      right={
        <AuthCard
          variant="login"
          action={loginAction}
          errorMessage={getErrorMessage(params.error)}
          successMessage={getSuccessMessage(params.message)}
          redirectedFrom={params.redirectedFrom}
        />
      }
    />
  );
}