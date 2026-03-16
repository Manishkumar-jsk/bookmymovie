"use client";

import { useRouter } from "next/navigation";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

ModuleRegistry.registerModules([AllCommunityModule]);

export default function AdminLayout({ children }: { children: React.ReactNode }) {
//   const { data: user, isLoading } = useGetMeQuery();
  const router = useRouter();

//   if (isLoading) return <p>Loading...</p>;

//   // ✅ Admin nahi hai toh redirect
//   if (user?.role !== "admin") {
//     router.replace("/");
//     return null;
//   }

  return (
    <div className="flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <a href="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Dashboard</a>
          <a href="/events" className="block py-2 px-3 rounded hover:bg-gray-700">Events</a>
          <a href="/users" className="block py-2 px-3 rounded hover:bg-gray-700">Users</a>
        </nav>
      </aside>

      {/* Admin Content */}
      <main className="flex-1 p-6">
        {children}
        <div id="modalRoot" />
      </main>
    </div>
  );
}