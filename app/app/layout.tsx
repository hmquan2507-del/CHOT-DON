import { redirect } from "next/navigation";
import AppSidebar from "@/components/app/AppSidebar";
import AppTopbar from "@/components/app/AppTopbar";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7FAF4] text-[#07111F]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_72%_10%,rgba(16,185,129,0.14),transparent_34%),radial-gradient(circle_at_12%_18%,rgba(245,158,11,0.10),transparent_30%)]" />

      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <AppTopbar />

          <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[1680px] px-4 pb-8 pt-4 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
