"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { ROADMAP_STAGES } from "@/lib/rag";
import { getRoadmapProgress, setRoadmapStage } from "@/lib/storage";
import { CheckCircle2, Play, BookOpen, GraduationCap } from "lucide-react";

export default function LearningRoadmap() {
  const { language } = useAuth();
  const [progress, setProgress] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setProgress(getRoadmapProgress());
  }, []);

  const stages = ROADMAP_STAGES.map((s) => ({ ...s, completed: !!progress[s.id] }));
  const completed = stages.filter((s) => s.completed).length;
  const pct = stages.length ? Math.round((completed / stages.length) * 100) : 0;

  const toggle = (id: string) => {
    const next = { ...progress, [id]: !progress[id] };
    setProgress(next);
    setRoadmapStage(id, !progress[id]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("learningRoadmap", language)}</h1>
          <p className="text-white/60 text-sm">Track your progress through the AI Engineer learning path.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70">
          <CheckCircle2 size={14} strokeWidth={2} />
          <span className="font-bold text-white">{pct}%</span>
        </div>
      </div>

      <div className="w-full bg-white/5 rounded-xl border border-white/10 p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 rounded-full h-2 bg-white/10 overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }}></div>
          </div>
          <span className="text-xs font-bold text-white">{pct}% {t("learningProgress", language)}</span>
        </div>
      </div>

      <div className="space-y-3">
        {stages.map((stage, i) => (
          <div key={stage.id} className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/3 p-4 hover:bg-white/5 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-colors ${stage.completed ? "bg-green-500 text-black" : "bg-white/10 text-white/50 border border-white/10"}`}>
              {stage.completed ? <CheckCircle2 size={14} strokeWidth={2} /> : <span>{i + 1}</span>}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className={`font-bold ${stage.completed ? "text-green-400" : "text-white"}`}>{stage.title}</h4>
                <span className="text-[10px] uppercase tracking-wider font-semibold border rounded px-2 py-0.5">
                  {stage.completed ? t("completed", language) : t("pending", language)}
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">{stage.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <BookOpen size={14} strokeWidth={2} className="text-white/40" />
                <span className="text-xs text-white/60">Recommended resources available</span>
              </div>
            </div>
            <button
              onClick={() => toggle(stage.id)}
              className="p-1.5 rounded transition-colors hover:bg-white/10"
            >
              {stage.completed ? (
                <CheckCircle2 size={16} strokeWidth={2} className="text-green-400" />
              ) : (
                <Play size={16} strokeWidth={2} className="text-white/50" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
        <p className="text-sm text-white/60">{t("temporaryData", language)}</p>
      </div>
    </div>
  );
}
