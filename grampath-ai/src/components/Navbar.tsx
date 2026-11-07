"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { LANGUAGES, t, type Language } from "@/lib/translations";
import { LogOut, Menu, X, Globe } from "lucide-react";
import { cn } from "./ui";

export function Navbar() {
  const { session, logout, language, setLanguage } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = React.useState(false);

  const langRef = React.useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/", label: t("home", language) },
    { href: "/features", label: t("features", language) },
    { href: "/career-guidance", label: t("careerGuidance", language) },
    { href: "/ai-assistant", label: t("aiAssistant", language) },
  ];

  const langLabel = LANGUAGES[language].native;

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-navy/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white">
          <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-black font-bold text-sm">
            GP
          </div>
          <span className="tracking-tight">GramaPath<span className="text-green-400">AI</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-green-400 transition-colors">
              {item.label}
            </Link>
          ))}
          <div className="relative inline-block" ref={langRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLangDropdownOpen((o) => !o);
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-colors"
              aria-haspopup="true"
              aria-expanded={langDropdownOpen}
            >
              <Globe size={14} />
              <span>{langLabel}</span>
            </button>
            {langDropdownOpen && (
              <div
                className={cn(
                  "absolute left-0 mt-2 w-28 rounded-xl border border-white/20 bg-white/10 p-1 shadow-xl z-50",
                  "backdrop-blur-sm"
                )}
              >
                {Object.entries(LANGUAGES).map(([code, info]) => (
                  <button
                    key={code}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLanguage(code as Language);
                      setLangDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm text-white hover:bg-white/10 transition-colors ${
                      language === code ? "bg-green-500 text-black" : ""
                    }`}
                  >
                    {info.native}
                  </button>
                ))}
              </div>
            )}
          </div>
          {!session ? (
            <>
              <Link href="/login" className="text-white hover:text-green-400 transition-colors">
                {t("login", language)}
              </Link>
              <Link href="/register" className="px-4 py-1.5 rounded-md bg-green-500 text-black font-semibold hover:bg-green-400 transition-colors">
                {t("getStarted", language)}
              </Link>
            </>
          ) : (
            <button onClick={logout} className="flex items-center gap-2 text-sm text-white hover:text-red-400 transition-colors">
              <LogOut size={16} /> {t("logout", language)}
            </button>
          )}
        </div>

        <button
          className="md:hidden p-2 text-white"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Open menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-navy/95 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="block py-2 text-white hover:text-green-400">
              {item.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 text-xs font-medium text-white mb-2">
              <Globe size={14} /> <span>{langLabel}</span>
            </div>
            {Object.entries(LANGUAGES).map(([code, info]) => (
              <button key={code} onClick={() => setLanguage(code as Language)} className="w-full text-left py-2 px-3 rounded text-white hover:bg-white/5">
                {info.native}
              </button>
            ))}
            {!session ? (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)} className="block py-2 px-3 rounded text-white hover:bg-white/5">
                  {t("login", language)}
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 px-3 rounded bg-green-500/20 text-white font-medium"
                >
                  {t("getStarted", language)}
                </Link>
              </>
            ) : (
              <button onClick={() => { logout(); setMobileOpen(false); }} className="w-full text-left py-2 px-3 rounded text-red-400 font-medium hover:bg-white/5">
                <LogOut size={16} /> {t("logout", language)}
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
