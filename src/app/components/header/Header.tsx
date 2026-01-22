'use client'
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
    const router = useRouter()
  return (
    <header className="flex items-center justify-between px-6 py-[14px] shadow-md">
      <h1 className="text-2xl font-bold text-red-500">🎬 MovieBook</h1>

      <div className="flex items-center gap-4">
        <select className="rounded-md px-3 py-2 text-sm outline-none">
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
        </select>

        <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition" onClick={() => router.push('/login')}>
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Header;
