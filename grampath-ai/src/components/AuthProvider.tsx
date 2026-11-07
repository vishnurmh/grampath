"use client";

import * as React from "react";
import {
  getSession,
  setSession,
  clearSession,
  getLanguage,
  setLanguage,
  type DemoSession,
} from "@/lib/storage";
import { LANGUAGES, type Language } from "@/lib/translations";

interface AuthContextType {
  session: DemoSession | null;
  login: (name: string, email: string) => void;
  logout: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isLoading: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSessionState] = React.useState<DemoSession | null>(null);
  const [language, setLanguageState] = React.useState<Language>("en");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setSessionState(getSession());
    setLanguageState(getLanguage());
    setIsLoading(false);
  }, []);

  const login = (name: string, email: string) => {
    const s: DemoSession = { isLoggedIn: true, name, email };
    setSession(s);
    setSessionState(s);
  };

  const logout = () => {
    clearSession();
    setSessionState(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout, language, setLanguage: setLanguageState, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
