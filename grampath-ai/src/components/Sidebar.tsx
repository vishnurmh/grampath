"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { LogOut, LayoutDashboard, Search, Bot, BookOpen, GraduationCap, User, ShieldAlert } from "lucide-react";
import { cn } from "./ui";

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const DASHBOARD_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "overview", icon: LayoutDashboard },
  { href: "/dashboard/career-explorer", label: "careerExplorer", icon: Search },
  { href: "/dashboard/ai-assistant", label: "aiAssistant", icon: Bot },
  { href: "/dashboard/learning-roadmap", label: "learningRoadmap", icon: BookOpen },
  { href: "/dashboard/scholarships", label: "scholarships", icon: GraduationCap },
  { href: "/dashboard/profile", label: "profile", icon: User },
];

export function Sidebar({ className }: { className?: string }) {
  const { session, logout, language } = useAuth();

  return (
    <aside className={cn("w-64 flex-shrink-0 border-r border-white/10 bg-navy/95 flex flex-col z-30 transition-transform duration-300", className)}>
      <div className="p-5 flex items-center gap-2">
        <div className="w-9 h-9 rounded bg-green-500 flex items-center justify-center text-black font-bold text-xs">
          GP
        </div>
        <span className="font-bold text-white text-sm tracking-tight">GramaPath<span className="text-green-400">AI</span></span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {DASHBOARD_ITEMS.map((item) => {
          const href = item.href;
          return (
            <Link key={item.href} href={href} className={cn("group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-white/5 hover:text-white transition-colors")}>
              <item.icon size={18} strokeWidth={2} />
              {t(item.label, language)}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 mb-3 p-2 rounded bg-white/5">
          <ShieldAlert size={18} strokeWidth={2} className="text-red-400" />
          <span className="text-xs text-white/70 leading-tight">{t("demoNotice", language)}</span>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-white/5 transition-colors border border-transparent hover:border-red-500/30"
        >
          <LogOut size={18} strokeWidth={2} />
          {t("logout", language)}
        </button>
      </div>

      <div className="p-4 text-xs text-white/50 text-center">
        {t("temporaryData", language)}
      </div>
    </aside>
  );
}
