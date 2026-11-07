"use client";

import * as React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { CAREERS } from "@/lib/data";
import { Search, Filter, Briefcase, GraduationCap } from "lucide-react";

const CATEGORIES = [
  "All",
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

export default function CareerGuidance() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("All");

  const filtered = CAREERS.filter((c) => {
    const q = query.toLowerCase();
    const matchesQuery =
      c.title.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.requiredSkills.some((s) => s.toLowerCase().includes(q));
    const matchesCat = category === "All" || c.category === category;
    return matchesQuery && matchesCat;
  });

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />
      <main className="flex-1 px-4 pt-16 pb-20 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">Career Guidance</h1>
              <p className="text-white/60 text-sm">Explore career paths across multiple fields.</p>
            </div>
            <div className="flex items-center gap-2">
              <Briefcase size={20} strokeWidth={2} className="text-green-400" />
              <span className="text-white/60 text-sm">{filtered.length} careers</span>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-5 mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search careers..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/3 text-white focus:outline-none focus:border-green-400 placeholder-white/30"
                />
              </div>
              <div className="relative flex-1 sm:w-64">
                <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/20 bg-white/3 text-white focus:outline-none focus:border-green-400 appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.length === 0 ? (
              <div className="col-span-full text-center py-16 rounded-xl border border-white/10 bg-white/5 p-8">
                <p className="text-white/60">No careers found matching your search.</p>
              </div>
            ) : (
              filtered.map((c) => (
                <div key={c.id} className="rounded-xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 hover:border-white/20 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-green-400">{c.category}</span>
                      <h3 className="text-lg font-bold text-white mt-1">{c.title}</h3>
                    </div>
                    <GraduationCap size={16} strokeWidth={2} className="text-white/40" />
                  </div>
                  <p className="text-sm text-white/60 mb-4 line-clamp-3">{c.description}</p>
                  <div className="space-y-1 mb-4">
                    {c.requiredSkills.slice(0, 4).map((s) => (
                      <span key={s} className="inline-block px-2 py-0.5 rounded border border-white/10 text-[10px] text-white/60 bg-white/3">{s}</span>
                    ))}
                  </div>
                  <Link href={`/dashboard/career-explorer`} className="text-xs font-bold text-green-400 hover:underline flex items-center gap-1">
                    View details <ArrowRightIcon size={14} strokeWidth={2} />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ArrowRightIcon({ size, strokeWidth }: { size: number; strokeWidth: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
