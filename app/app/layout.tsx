import AppSidebar from "@/components/app/AppSidebar";
import AppTopbar from "@/components/app/AppTopbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F7FAF4] text-[#07111F]">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_72%_12%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_18%_86%,rgba(5,150,105,0.08),transparent_26%),linear-gradient(135deg,#F7FAF4_0%,#FBFDF9_45%,#ECFDF5_100%)]" />

      <div className="flex min-h-screen">
        <AppSidebar />

        <div className="min-w-0 flex-1">
          <AppTopbar />

          <main className="mx-auto min-h-[calc(100vh-88px)] w-full max-w-[1680px] px-4 pb-8 pt-4 sm:px-5 lg:px-6 xl:px-7">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}