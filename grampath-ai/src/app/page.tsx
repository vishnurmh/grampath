"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { t, type Language } from "@/lib/translations";
import { Navbar } from "@/components/Navbar";
import {
  Zap,
  BookOpen,
  GraduationCap,
  Bot,
  ArrowRight,
  Play,
  Laptop,
  GraduationCap as GradCap,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    id: "ai-career",
    icon: Zap,
    titleKey: "feature1Title",
    descKey: "feature1Desc",
  },
  {
    id: "roadmaps",
    icon: BookOpen,
    titleKey: "feature2Title",
    descKey: "feature2Desc",
  },
  {
    id: "scholarships",
    icon: GraduationCap,
    titleKey: "feature3Title",
    descKey: "feature3Desc",
  },
  {
    id: "assistant",
    icon: Bot,
    titleKey: "feature4Title",
    descKey: "feature4Desc",
  },
];

const STEPS = [
  { num: "01", key: "step1" },
  { num: "02", key: "step2" },
  { num: "03", key: "step3" },
];

export default function Home() {
  const { language } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-navy text-white">
      <Navbar />

      <main className="flex-1 relative overflow-hidden">
        {/* Hero */}
        <section className="relative px-4 pt-16 pb-20 md:px-8 lg:px-12 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-balance leading-tight mb-6">
              {t("heroTitle", language)}
            </h1>
            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t("heroDescription", language)}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/register"
                className="px-8 py-3.5 bg-green-500 text-black font-bold rounded-xl text-lg hover:bg-green-400 transition-colors shadow-lg shadow-green-500/25"
              >
                {t("btnGetStarted", language)} <ArrowRight size={20} className="ml-2 inline" />
              </Link>
              <Link
                href="/features"
                className="px-8 py-3.5 border border-white/20 rounded-xl text-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-sm"
              >
                {t("btnExploreFeatures", language)}
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="mt-16 relative mx-auto max-w-2xl opacity-80">
            <div className="relative rounded-2xl p-1 bg-green-500/20 border border-white/10">
              <div className="relative rounded-xl bg-navy/60 border border-white/5 p-8 md:p-12 shadow-2xl">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="rounded-lg bg-white/5 p-3 border border-white/5 overflow-hidden group hover:bg-white/10 transition-colors">
                      <div className="h-16 rounded bg-white/10 mb-2"></div>
                      <div className="h-4 rounded bg-white/5"></div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 px-4 py-2 rounded bg-white/5 border border-white/10 w-fit mx-auto">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-white/60 font-mono">grampath.ai • live</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 pb-20 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Features</h2>
              <p className="text-white/60 max-w-xl mx-auto">Everything a student needs to discover and grow a career path.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.id} className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4 text-green-400">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{t(f.titleKey, language)}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{t(f.descKey, language)}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 pb-24 md:px-8 lg:px-12 bg-white/5">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-white/60 max-w-xl mx-auto">Three simple steps to discover your path.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {STEPS.map((s) => (
                <div key={s.num} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-black flex items-center justify-center font-bold text-lg mb-4 shadow-lg shadow-green-500/30">
                    {s.num}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{t(s.key, language)}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-navy/80 py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded bg-green-500 flex items-center justify-center text-black font-bold text-xs">GP</div>
              <span className="font-bold text-white">GramaPath<span className="text-green-400">AI</span></span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs">
              {t("aboutText", language)}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t("features", language)}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="/features" className="hover:text-white transition-colors">AI Career Guidance</a></li>
              <li><a href="/dashboard/learning-roadmap" className="hover:text-white transition-colors">Learning Roadmaps</a></li>
              <li><a href="/dashboard/scholarships" className="hover:text-white transition-colors">Scholarships</a></li>
              <li><a href="/dashboard/ai-assistant" className="hover:text-white transition-colors">AI Assistant</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t("contact", language)}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Email: support@grampath.ai</li>
              <li>Demo application</li>
              <li>No permanent database</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">{t("projectInfo", language)}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>{t("projectInfoText", language)}</li>
              <li>Next.js • Tailwind • TypeScript</li>
              <li>Vercel-ready</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 text-center text-xs text-white/40">
          {t("footerNote", language)}
        </div>
      </footer>
    </div>
  );
}
