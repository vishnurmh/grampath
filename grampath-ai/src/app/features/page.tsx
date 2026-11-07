"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { Navbar } from "@/components/Navbar";
import { Zap, BookOpen, GraduationCap, Bot, ArrowRight } from "lucide-react";

const FEATURES = [
  { id: "ai-career", icon: Zap, titleKey: "feature1Title", descKey: "feature1Desc" },
  { id: "roadmaps", icon: BookOpen, titleKey: "feature2Title", descKey: "feature2Desc" },
  { id: "scholarships", icon: GraduationCap, titleKey: "feature3Title", descKey: "feature3Desc" },
  { id: "assistant", icon: Bot, titleKey: "feature4Title", descKey: "feature4Desc" },
];

export default function Features() {
  const { language } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />
      <main className="flex-1 px-4 pt-16 pb-20 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">{t("features", language)}</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <Link key={f.id} href={f.id === "assistant" ? "/ai-assistant" : f.id === "scholarships" ? "/dashboard/scholarships" : "/dashboard/career-explorer"} className="group block">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-colors">
                    <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center mb-4 text-green-400 group-hover:bg-green-500 transition-colors">
                      <Icon size={24} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{t(f.titleKey, language)}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{t(f.descKey, language)}</p>
                    <div className="mt-6 flex items-center gap-1 text-xs font-bold text-green-400">
                      Learn more <ArrowRight size={14} strokeWidth={2} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
