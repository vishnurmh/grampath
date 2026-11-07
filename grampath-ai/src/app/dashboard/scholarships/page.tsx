"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { SCHOLARSHIPS } from "@/lib/data";
import { GraduationCap, Banknote, Shield, Clock } from "lucide-react";

const TYPE_LABEL: Record<string, string> = {
  Government: "Government",
  Merit: "Merit-based",
  Need: "Need-based",
  Technical: "Technical",
};
const TYPE_COLOR: Record<string, string> = {
  Government: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Merit: "bg-green-500/10 text-green-400 border-green-500/20",
  Need: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Technical: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

const ICONS: Record<string, React.ElementType> = {
  Government: Shield,
  Merit: GraduationCap,
  Need: Banknote,
  Technical: Clock,
};

export default function Scholarships() {
  const { language } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">{t("scholarships", language)}</h1>
        <p className="text-white/60 text-sm">Explore scholarships to support your education. Sample data only.</p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-4">
        <p className="text-xs text-red-400/80 font-medium">
          {t("sampleDataNotice", language)}
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {SCHOLARSHIPS.map((s) => {
          const Icon = ICONS[s.type];
          return (
            <div key={s.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className={`text-[10px] uppercase tracking-wider font-bold border rounded px-2 py-0.5 ${TYPE_COLOR[s.type]}`}>
                    {TYPE_LABEL[s.type]}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-1">{s.name}</h3>
                </div>
                <Icon size={16} strokeWidth={2} className="text-white/40" />
              </div>
              <p className="text-sm text-white/70 mb-4 leading-relaxed">{s.description}</p>
              <div className="space-y-2 text-sm text-white/60">
                <div className="flex items-start gap-2">
                  <Shield size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Eligibility</div>
                    <div className="leading-relaxed">{s.eligibility}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Banknote size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">Benefits</div>
                    <div className="leading-relaxed">{s.benefits}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                  <Clock size={14} strokeWidth={2} className="mt-0.5 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white mb-0.5">How to apply</div>
                    <div className="leading-relaxed">{s.applicationInfo}</div>
                  </div>
                </div>
                <div className="mt-2 flex items-start gap-2">
                  <span className="text-[10px] font-bold text-white shrink-0">Provider</span>
                  <div className="text-xs leading-relaxed">{s.provider}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
