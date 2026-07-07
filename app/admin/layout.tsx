import AdminNav from "@/components/admin/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0f0f0f]">
      {/* TIdebar */}

      <div className="w-64 bg-[#1a1a1a]">
        <AdminNav />
      </div>

      {/* Main content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
