"use client";

import * as React from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { getProfile, getSavedCareers, getRoadmapProgress } from "@/lib/storage";
import { t } from "@/lib/translations";
import { CAREERS } from "@/lib/data";
import {
  User as UserIcon,
  TrendingUp,
  CheckCircle,
  Clock,
  GraduationCap,
  Briefcase,
  Folder,
} from "lucide-react";

export default function DashboardOverview() {
  const { session, language } = useAuth();
  const profile = getProfile();
  const savedCareers = getSavedCareers();
  const roadmap = getRoadmapProgress();

  const stages = Object.values(roadmap);
  const completedCount = stages.filter(Boolean).length;
  const total = stages.length || 6;
  const progress = total ? Math.round((completedCount / total) * 100) : 0;

  const recommended = CAREERS.slice(0, 3);

  const recentActivity = [
    { label: t("activityLogin", language), time: "Just now", icon: UserIcon, color: "text-green-400" },
    savedCareers.length > 0 ? { label: t("activityCareerSaved", language), time: "Earlier", icon: Folder, color: "text-blue-400" } : null,
    completedCount > 0 ? { label: t("activityStageCompleted", language), time: "Today", icon: CheckCircle, color: "text-yellow-400" } : null,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("welcome", language)} {session?.name || t("welcomeStudent", language)}</h1>
          <p className="text-white/60 text-sm">{t("demoWarning", language)}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70">
          <CheckCircle size={14} strokeWidth={2} />
          <span>{progress}% {t("learningProgress", language)}</span>
        </div>
      </div>

      {/* Profile card + stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold text-white mb-4">{t("profileCard", language)}</h3>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">
                {(profile?.name || session?.name || "S").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-white">{profile?.name || session?.name || "Student"}</p>
                <p className="text-xs text-white/50">{profile?.email || session?.email || "—"}</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-white/70 border-b border-white/5 pb-1">
                <span>Saved Careers</span>
                <span className="font-medium text-white">{savedCareers.length}</span>
              </div>
              <div className="flex justify-between text-white/70 border-b border-white/5 pb-1">
                <span>Roadmap Progress</span>
                <span className="font-medium text-white">{progress}%</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Language</span>
                <span className="font-medium text-white">{language === "te" ? "Telugu" : "English"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard title={t("recommendedCareers", language)} value={recommended.length} icon={Briefcase} color="text-blue-400" />
            <StatCard title={t("savedCareers", language)} value={savedCareers.length} icon={Folder} color="text-yellow-400" />
            <StatCard title={t("learningProgress", language)} value={`${progress}%`} icon={TrendingUp} color="text-green-400" />
          </div>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-bold text-white mb-4">{t("recommendedCareers", language)}</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {recommended.map((c) => (
                <Link key={c.id} href={`/dashboard/career-explorer`} className="group p-4 rounded-lg border border-white/5 bg-white/3 hover:bg-white/10 hover:border-white/20 transition-colors">
                  <GraduationCap size={16} className="mb-2 text-white/40 group-hover:text-green-400 transition-colors" />
                  <h4 className="font-bold text-white">{c.title}</h4>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2">{c.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-white">{t("recentActivity", language)}</h3>
        </div>
        <div className="space-y-3">
          {recentActivity.length > 0 ? (
            recentActivity.map((item, i) => {
              const it = item!;
              return (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <it.icon size={16} strokeWidth={2} className={it.color} />
                  <div className="flex-1">
                    <p className="text-white/90">{it.label}</p>
                    <p className="text-xs text-white/50">{it.time}</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-white/60">{t("noSaved", language)}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: React.ElementType; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-wider font-semibold">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-green-400">
          <Icon size={18} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
