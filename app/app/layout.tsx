import AppSidebar from "@/components/app/AppSidebar";
import AppTopbar from "@/components/app/AppTopbar";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#F3F4F6] p-4 font-sans text-slate-900 antialiased">
      <div className="mx-auto flex min-h-[calc(100vh-32px)] max-w-[1680px] overflow-hidden rounded-[32px] border border-slate-200 bg-[#FCFCFA] shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <AppSidebar />

        <div className="flex min-w-0 flex-1 flex-col">
          <AppTopbar />

          <main className="flex-1 overflow-x-hidden px-5 py-5 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
