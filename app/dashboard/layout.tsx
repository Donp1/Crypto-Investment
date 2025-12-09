import ProtectedPage from "@/components/ProtectedRoutes";
import Sidebar from "@/components/Sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ProtectedPage>
      <div className="min-h-screen bg-gray-900 text-white relative">
        <Sidebar />
        <main className="md:ml-64 p-6 pt-16 md:pt-6">{children}</main>
      </div>
    </ProtectedPage>
  );
}
