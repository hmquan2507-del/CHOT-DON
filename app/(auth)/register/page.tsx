import { registerAction } from "../actions";
import AuthCard from "../../../components/auth/AuthCard";
import AuthHero from "../../../components/auth/AuthHero";
import AuthShell from "../../../components/auth/AuthShell";
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

  return (
    <AuthShell
      left={<AuthHero variant="register" />}
      right={
        <AuthCard
          variant="register"
          action={registerAction}
          errorMessage={getErrorMessage(params.error)}
        />
      }
    />
  );
}