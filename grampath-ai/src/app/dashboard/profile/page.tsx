"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { getProfile, setProfile, getSavedCareers, getRoadmapProgress } from "@/lib/storage";
import { CAREERS } from "@/lib/data";
import { User, Mail, Folder, CheckCircle2, Save } from "lucide-react";

export default function Profile() {
  const { language, session, logout } = useAuth();
  const [editing, setEditing] = React.useState(false);

  const profile = getProfile();
  const savedCareers = getSavedCareers();
  const roadmap = getRoadmapProgress();
  const completed = Object.values(roadmap).filter(Boolean).length;

  const [form, setForm] = React.useState(() => {
    const p = getProfile();
    return {
      name: p?.name || session?.name || "",
      email: p?.email || session?.email || "",
    };
  });

  const handleSave = () => {
    setProfile({ name: form.name.trim(), email: form.email.trim(), updatedAt: Date.now() });
    setEditing(false);
  };

  const savedCareerTitles = savedCareers.map((id) => {
    const c = CAREERS.find((x) => x.id === id);
    return c ? c.title : id;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("profile", language)}</h1>
          <p className="text-white/60 text-sm">Manage your profile and preferences.</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-sm text-red-400 hover:text-red-300 transition-colors">
          <Save size={16} strokeWidth={2} /> {t("logout", language)}
        </button>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-black font-bold text-xl">
            {form.name.charAt(0).toUpperCase() || "S"}
          </div>
          <div>
            <h2 className="font-bold text-white">{form.name || session?.name || "Student"}</h2>
            <p className="text-xs text-white/50">{form.email || session?.email || "—"}</p>
          </div>
        </div>

        {!editing ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded bg-white/3 border border-white/5">
              <div className="flex items-center gap-3">
                <User size={18} strokeWidth={2} className="text-green-400" />
                <div>
                  <div className="text-xs font-bold text-white">{t("fullName", language)}</div>
                  <div className="text-sm text-white/70">{form.name || session?.name || "—"}</div>
                </div>
              </div>
              <button onClick={() => setEditing(true)} className="text-xs text-green-400 hover:underline">Edit</button>
            </div>
            <div className="flex items-center justify-between p-3 rounded bg-white/3 border border-white/5">
              <div className="flex items-center gap-3">
                <Mail size={18} strokeWidth={2} className="text-blue-400" />
                <div>
                  <div className="text-xs font-bold text-white">{t("email", language)}</div>
                  <div className="text-sm text-white/70">{form.email || session?.email || "—"}</div>
                </div>
              </div>
              <button onClick={() => setEditing(true)} className="text-xs text-green-400 hover:underline">Edit</button>
            </div>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/80 uppercase">{t("fullName", language)}</label>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-3 py-2 rounded-xl border border-white/20 bg-white/3 text-white focus:outline-none focus:border-green-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/80 uppercase">{t("email", language)}</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-3 py-2 rounded-xl border border-white/20 bg-white/3 text-white focus:outline-none focus:border-green-400"
              />
            </div>
            <div className="flex gap-3">
              <button type="submit" className="flex-1 py-2.5 rounded-xl bg-green-500 text-black font-bold hover:bg-green-400 transition-colors">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/3 text-white font-bold hover:bg-white/10 transition-colors">Cancel</button>
            </div>
          </form>
        )}

        <div className="mt-6 pt-6 border-t border-white/10">
          <h3 className="font-bold text-white mb-3 flex items-center gap-1">
            <Folder size={16} strokeWidth={2} className="text-yellow-400" /> {t("savedCareers", language)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {savedCareerTitles.length > 0 ? (
              savedCareerTitles.map((title) => (
                <span key={title} className="px-3 py-1 rounded border border-white/10 text-xs text-white/70 bg-white/3">{title}</span>
              ))
            ) : (
              <p className="text-xs text-white/50">{t("noSaved", language)}</p>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">{completed}</div>
            <div className="text-xs text-white/50">Roadmap Stages Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{language === "te" ? "Telugu" : "English"}</div>
            <div className="text-xs text-white/50">Language Preference</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs text-white/50">{t("temporaryData", language)}</p>
      </div>
    </div>
  );
}
