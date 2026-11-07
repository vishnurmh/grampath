"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { Navbar } from "@/components/Navbar";
import { Mail, Lock, User, AlertCircle } from "lucide-react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Register() {
  const router = useRouter();
  const { language, login } = useAuth();
  const [form, setForm] = React.useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { name, email, password, confirmPassword } = form;
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setError(t("requiredField", language));
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setError(t("invalidEmail", language));
      return;
    }
    if (password !== confirmPassword) {
      setError(t("passwordsDontMatch", language));
      return;
    }
    setSubmitting(true);
    // Save temporary profile
    const profile = { name: name.trim(), email: email.trim(), createdAt: Date.now() };
    localStorage.setItem("grampath_profile", JSON.stringify(profile));
    login(name.trim(), email.trim());
    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy">
      <Navbar />
      <div className="flex-1">
        <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded bg-green-500 flex items-center justify-center text-black font-bold text-xl mx-auto mb-3">
                GP
              </div>
              <h2 className="text-2xl font-bold text-white">Create account</h2>
              <p className="text-white/60 text-sm">Join GramaPath AI and start exploring careers</p>
            </div>

            {error && (
              <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-sm text-red-400 flex items-center gap-2">
                <AlertCircle size={16} strokeWidth={2} /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">{t("fullName", language)}</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-3 text-white/40" />
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Ravi Kumar"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all placeholder-white/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">{t("email", language)}</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-3 text-white/40" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all placeholder-white/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">{t("password", language)}</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-white/40" />
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all placeholder-white/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/80">{t("confirmPassword", language)}</label>
                <div className="relative">
                  <Lock size={18} className="absolute left-3 top-3 text-white/40" />
                  <input
                    type="password"
                    value={form.confirmPassword}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-white/5 text-white focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all placeholder-white/30"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-green-500 text-black font-bold text-lg hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors shadow-lg shadow-green-500/25"
              >
                {submitting ? "Creating account..." : t("createAccount", language)}
              </button>
            </form>

            <p className="mt-6 text-xs text-white/50 text-center">
              {t("demoNotice", language)}
            </p>

            <div className="mt-6 text-center">
              <p className="text-sm text-white/60">
                {t("alreadyHaveAccount", language)}{" "}
                <Link href="/login" className="text-green-400 font-medium hover:underline">
                  {t("signIn", language)}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
