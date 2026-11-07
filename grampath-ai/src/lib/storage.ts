import { Language } from "./translations";

const SESSION_KEY = "grampath_session";
const PROFILE_KEY = "grampath_profile";
const CAREERS_KEY = "grampath_saved_careers";
const ROADMAP_KEY = "grampath_roadmap_progress";
const LANG_KEY = "grampath_language";

export interface DemoSession {
  isLoggedIn: boolean;
  name: string;
  email: string;
}

export function getSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function setSession(session: DemoSession): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function getProfile() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setProfile(profile: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function getSavedCareers(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CAREERS_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addSavedCareer(careerId: string): void {
  if (typeof window === "undefined") return;
  const current = getSavedCareers();
  if (!current.includes(careerId)) {
    localStorage.setItem(CAREERS_KEY, JSON.stringify([...current, careerId]));
  }
}

export function removeSavedCareer(careerId: string): void {
  if (typeof window === "undefined") return;
  const current = getSavedCareers();
  localStorage.setItem(CAREERS_KEY, JSON.stringify(current.filter((id) => id !== careerId)));
}

export function isCareerSaved(careerId: string): boolean {
  return getSavedCareers().includes(careerId);
}

export function getRoadmapProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ROADMAP_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function setRoadmapStage(stageId: string, completed: boolean): void {
  if (typeof window === "undefined") return;
  const current = getRoadmapProgress();
  localStorage.setItem(ROADMAP_KEY, JSON.stringify({ ...current, [stageId]: completed }));
}

export function getLanguage(): Language {
  if (typeof window === "undefined") return "en";
  try {
    const raw = localStorage.getItem(LANG_KEY);
    return (raw === "en" || raw === "te") ? raw : "en";
  } catch {
    return "en";
  }
}

export function setLanguage(lang: Language): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(LANG_KEY, lang);
}

export function clearAllStorage(): void {
  if (typeof window === "undefined") return;
  clearSession();
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(CAREERS_KEY);
  localStorage.removeItem(ROADMAP_KEY);
  localStorage.removeItem(LANG_KEY);
}
