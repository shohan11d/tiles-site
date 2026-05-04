"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => setIsLoggedIn(!isLoggedIn);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Website Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center transition-transform group-hover:scale-110">
              <span className="text-white font-bold text-lg">T</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">
              Tile<span className="text-indigo-500">Gallery</span>
            </span>
          </Link>
        </div>

        {/* Centre: Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-indigo-500"
          >
            Home
          </Link>
          <Link
            href="/tiles"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-indigo-500"
          >
            All Tiles
          </Link>
          <Link
            href="/my-profile"
            className="text-sm font-medium text-foreground/80 transition-colors hover:text-indigo-500"
          >
            My Profile
          </Link>
        </div>

        {/* Right: Auth Section */}
        <div className="flex items-center gap-4">
          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm font-medium text-foreground/80 hover:text-indigo-500 transition-colors px-4 py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex h-10 items-center justify-center rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-700 hover:shadow-indigo-500/40 active:scale-95"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/profile"
                className="flex items-center gap-2 text-sm font-medium text-foreground/80 hover:text-indigo-500 transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 border border-indigo-200">
                  <span className="text-xs font-bold">JD</span>
                </div>
                <span className="hidden sm:inline">Profile</span>
              </Link>
              <button
                onClick={toggleLogin}
                className="text-sm font-medium text-foreground/60 hover:text-red-500 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile Menu (Simplified for now) */}
      <div className="md:hidden border-t border-white/5 py-2 overflow-x-auto">
        <div className="flex px-4 gap-6">
            <Link href="/" className="text-xs font-medium whitespace-nowrap">Home</Link>
            <Link href="/tiles" className="text-xs font-medium whitespace-nowrap">Tiles</Link>
            <Link href="/profile" className="text-xs font-medium whitespace-nowrap">Profile</Link>
        </div>
      </div>
    </nav>
  );
}
