"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/components/ui";

export default function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { session, language, isLoading } = useAuth();

  React.useEffect(() => {
    if (!session && !isLoading && typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }, [session, isLoading]);

  if (!session || isLoading) return null;

  const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-navy text-white">
      {/* Sidebar: fixed overlay on mobile; in document flow on desktop */}
      <aside
        className={cn(
          "w-64 flex-shrink-0 transition-transform duration-300 z-40",
          "fixed inset-y-0 left-0 -translate-x-full",
          "md:static md:inset-auto md:translate-x-0",
          mobileSidebarOpen ? "translate-x-0" : ""
        )}
      >
        <Sidebar className="" />
      </aside>

      <div className="flex-1 flex flex-col relative min-w-0">
        {/* Mobile top bar with hamburger to open sidebar */}
        <div className="md:hidden flex items-center justify-between border-b border-white/10 bg-navy/90 p-3 z-20 shrink-0 flex-shrink-0">
          <h2 className="font-bold text-white">GramaPath AI</h2>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 text-white hover:text-green-400 transition-colors"
            aria-label="Open menu"
          >
            <MenuIcon size={20} />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function MenuIcon({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-menu"
    >
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
