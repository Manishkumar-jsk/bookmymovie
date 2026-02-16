"use client";
import { useRouter } from "next/navigation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const router = useRouter();
  const data = useAuth();
  return (
    <header className="flex items-center justify-between px-6 py-[14px] shadow-md">
      <h1
        className="text-2xl font-bold text-red-500"
        onClick={() => router.push("/")}
      >
        🎬 EventBook
      </h1>

      <div className="flex items-center gap-4">
        <select className="rounded-md px-3 py-2 text-sm outline-none">
          <option>Delhi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
        </select>

        {data?.user ? (
          <button>
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-blue-500" />
          </button>
        ) : (
          <button
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
            onClick={() => router.push("/login")}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
