"use client";

import { Heart, Home, Code2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();



  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-pink-100 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 group"
          >
            <Heart className="w-6 h-6 text-pink-500 fill-pink-500 group-hover:scale-110 transition-transform" />
            <span className="font-display text-xl font-bold text-gray-900">
              HeartScript
            </span>
          </button>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push("/")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive("/")
                  ? "bg-pink-100 text-pink-700"
                  : "text-gray-600 hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              <Home size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>


          </div>
        </div>
      </div>
    </nav>
  );
}
