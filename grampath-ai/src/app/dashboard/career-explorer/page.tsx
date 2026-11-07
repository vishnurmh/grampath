"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { CAREERS, type Career } from "@/lib/data";
import { addSavedCareer, removeSavedCareer, isCareerSaved, getSavedCareers } from "@/lib/storage";
import { Search, Filter, Save, SaveCheck, ExternalLink, ChevronRight } from "lucide-react";

const CATEGORIES = [
  "Engineering",
  "Computer Science",
  "Artificial Intelligence",
  "Data Science",
  "Healthcare",
  "Agriculture",
  "Government Jobs",
  "Teaching",
  "Entrepreneurship",
];

export default function CareerExplorer() {
  const { language } = useAuth();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");
  const [selectedCareer, setSelectedCareer] = React.useState<Career | null>(null);

  const saved = getSavedCareers();

  const filtered = CAREERS.filter((c) => {
    const matchesQuery =
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.description.toLowerCase().includes(query.toLowerCase()) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    const matchesCat = category === "All" || c.category === category;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("careerExplorer", language)}</h1>
          <p className="text-white/60 text-sm">Explore career paths and find the right fit for you.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSelectedCareer(null)}
            className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70 hover:bg-white/10 transition-colors"
          >
            <ChevronRight size={14} className="mr-1" /> Back to list
          </button>
        </div>
      </div>

      {/* Search & filters */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-5">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("search", language)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/3 text-white focus:outline-none focus:border-green-400 placeholder-white/30"
            />
          </div>
          <div className="relative flex-1 md:w-64">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/3 text-white focus:outline-none focus:border-green-400 appearance-none"
            >
              <option value="All">{t("allCategories", language)}</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-end">
            <span className="text-xs text-white/50">{filtered.length} {t("noSaved", language) === "No saved careers yet." ? "careers" : "careers"}</span>
          </div>
        </div>
      </div>

      {selectedCareer ? (
        <CareerDetail career={selectedCareer} language={language} />
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-12 rounded-xl border border-white/10 bg-white/5 p-6">
              <p className="text-white/60">{t("noCareersFound", language)}</p>
            </div>
          ) : (
            filtered.map((career) => (
              <div key={career.id} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer group">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-green-400">{career.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 group-hover:text-green-400 transition-colors">{career.title}</h3>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const nowSaved = isCareerSaved(career.id);
                      if (nowSaved) removeSavedCareer(career.id); else addSavedCareer(career.id);
                    }}
                    className="p-1.5 rounded hover:bg-white/10 transition-colors"
                  >
                    {isCareerSaved(career.id) ? <SaveCheck size={18} strokeWidth={2} className="text-green-400" /> : <Save size={18} strokeWidth={2} className="text-white/50 group-hover:text-white" />}
                  </button>
                </div>
                <p className="text-sm text-white/60 mb-4 line-clamp-3">{career.description}</p>
                <div className="space-y-1 mb-4">
                  {career.requiredSkills.slice(0, 4).map((skill) => (
                    <span key={skill} className="inline-block px-2 py-0.5 rounded border border-white/10 text-[10px] text-white/60 bg-white/3">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <button
                    onClick={() => setSelectedCareer(career)}
                    className="text-xs font-bold text-green-400 hover:underline flex items-center gap-1"
                  >
                    {t("viewDetails", language)} <ExternalLink size={14} strokeWidth={2} />
                  </button>
                  <span className="text-[10px] text-white/40">{career.salaryRange}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function CareerDetail({ career, language }: { career: Career; language: string }) {
  const saved = isCareerSaved(career.id);

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6 max-w-3xl mx-auto animate-in fade-in slide-in-from-right-2 duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-xs uppercase tracking-wider font-bold text-green-400">{career.category}</span>
          <h2 className="text-2xl font-bold text-white mt-1">{career.title}</h2>
          <span className="text-xs text-white/40 mt-1 block">{career.salaryRange}</span>
        </div>
        <button
          onClick={() => {
            if (saved) removeSavedCareer(career.id); else addSavedCareer(career.id);
          }}
          className="p-2 rounded hover:bg-white/10 transition-colors"
        >
          {saved ? <SaveCheck size={20} strokeWidth={2} className="text-green-400" /> : <Save size={20} strokeWidth={2} className="text-white/50" />}
        </button>
      </div>

      <p className="text-white/70 leading-relaxed mb-6">{career.description}</p>

      <div className="grid md:grid-cols-2 gap-6">
        <section>
          <h4 className="font-bold text-white mb-2 flex items-center gap-1">
            <UserIcon size={16} strokeWidth={2} className="text-green-400" /> Required Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {career.requiredSkills.map((s) => (
              <span key={s} className="px-3 py-1 rounded border border-white/10 text-sm text-white/70 bg-white/3">
                {s}
              </span>
            ))}
          </div>
        </section>
        <section>
          <h4 className="font-bold text-white mb-2 flex items-center gap-1">
            <GraduationCapIcon size={16} strokeWidth={2} className="text-yellow-400" /> Education Requirements
          </h4>
          <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
            {career.educationRequirements.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-6">
        <h4 className="font-bold text-white mb-2 flex items-center gap-1">
          <BriefcaseIcon size={16} strokeWidth={2} className="text-blue-400" /> Career Opportunities
        </h4>
        <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
          {career.careerOpportunities.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h4 className="font-bold text-white mb-2 flex items-center gap-1">
          <BookOpenIcon size={16} strokeWidth={2} className="text-purple-400" /> Learning Suggestions
        </h4>
        <ul className="space-y-1 text-sm text-white/70 list-disc pl-5">
          {career.learningSuggestions.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function UserIcon({ size, strokeWidth, className }: { size: number; strokeWidth: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function GraduationCapIcon({ size, strokeWidth, className }: { size: number; strokeWidth: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M13 2l6 6 4-6" />
      <path d="M7 14h10v2H7z" />
      <path d="M3 22l1-1" />
      <path d="M17 22l1-1" />
      <path d="M10 22l1-1" />
    </svg>
  );
}
function BriefcaseIcon({ size, strokeWidth, className }: { size: number; strokeWidth: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function BookOpenIcon({ size, strokeWidth, className }: { size: number; strokeWidth: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
