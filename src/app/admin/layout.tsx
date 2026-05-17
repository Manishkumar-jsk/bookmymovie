"use client";


//third-party
import { ModuleRegistry, AllCommunityModule } from "ag-grid-community";
import Link from "next/link";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";


ModuleRegistry.registerModules([AllCommunityModule]);

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // if (data?.user?.role !== "admin") {
  //   router.replace("/");
  //   return;
  // }
  return (
    <div className="flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {/* <a
            href=""
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Dashboard
          </a> */}
          <Link
            href="/admin/events"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Events
          </Link>
          <Link
            href="/admin/categorys"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Categories
          </Link>
          <Link
            href="/admin/bookings"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Bookings
          </Link>
          <Link
            href="/admin/users"
            className="block py-2 px-3 rounded hover:bg-gray-700"
          >
            Users
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        {children}
        <div id="modalRoot" />
      </main>
    </div>
  );
}
