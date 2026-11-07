"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { t } from "@/lib/translations";
import { sendMessage } from "@/lib/rag-client";
import { Send, RotateCw, MessageCircle, FileText, ChevronRight } from "lucide-react";

const SUGGESTED = [
  "What skills do I need for a software engineer?",
  "How do I become a data scientist?",
  "What scholarships are available for rural students?",
  "How to prepare for government exams?",
  "What is the career path for an AI engineer?",
  "Tell me about agriculture officer jobs.",
];

export default function AIAssistant() {
  const { language } = useAuth();
  const [question, setQuestion] = React.useState("");
  const [messages, setMessages] = React.useState<{ role: "user" | "assistant"; content: string; sources?: any[] }[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const q = question.trim();
    if (!q) return;
    setMessages([...messages, { role: "user", content: q }]);
    setQuestion("");
    setLoading(true);
    try {
      const res = await sendMessage(q);
      setMessages([
        ...messages,
        { role: "user", content: q },
        { role: "assistant", content: res.answer, sources: res.sources },
      ]);
    } catch {
      setMessages([
        ...messages,
        { role: "user", content: q },
        { role: "assistant", content: "Sorry, I could not process your question. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setQuestion("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{t("aiAssistant", language)}</h1>
          <p className="text-white/60 text-sm">Ask questions about careers, education, and scholarships.</p>
        </div>
        <button onClick={clearChat} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs text-white/70 hover:bg-white/10 transition-colors">
          <RotateCw size={14} strokeWidth={2} /> {t("clearChat", language)}
        </button>
      </div>

      {/* How it works */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 mb-2">
        <div className="flex items-center gap-2 mb-3 text-xs font-bold text-white/80 uppercase tracking-wider">
          <FileText size={14} strokeWidth={2} /> {t("howItWorks", language)}
        </div>
        <div className="flex items-center gap-2 text-xs text-white/60">
          <span className="px-2 py-1 rounded border border-white/10 bg-white/3">{t("question", language)}</span>
          <span className="text-white/40">→</span>
          <span className="px-2 py-1 rounded border border-white/10 bg-white/3">{t("retrieval", language)}</span>
          <span className="text-white/40">→</span>
          <span className="px-2 py-1 rounded border border-white/10 bg-white/3">{t("documents", language)}</span>
          <span className="text-white/40">→</span>
          <span className="px-2 py-1 rounded border border-white/10 bg-white/3">{t("answer", language)}</span>
        </div>
        <p className="text-[10px] text-white/50 mt-2">{t("methodNote", language)}</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 min-h-[400px] rounded-xl border border-white/10 bg-white/5 p-4 overflow-y-auto flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center text-white/50">
            <MessageCircle size={32} strokeWidth={2} className="mb-3 opacity-50" />
            <p className="text-sm">Start by asking a question below.</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
              <div className={cnBubble(m.role)} style={{ maxWidth: "85%" }}>
              {m.role === "user" ? (
                <><span className="text-xs text-white/60 block mb-1">You</span>{m.content}</>
              ) : (
                <>
                  <span className="text-xs text-white/60 block mb-1">GramaPath AI</span>
                  <p className="text-sm text-white/90 leading-relaxed whitespace-pre-wrap">{m.content}</p>
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-white/5">
                      <p className="text-[10px] font-bold text-white/50 mb-1 uppercase">Sources</p>
                      <div className="flex gap-2">
                        {m.sources.map((s) => (
                          <span key={s.id} className="px-2 py-1 rounded border border-white/10 text-[10px] text-white/60 bg-white/3">
                            {s.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className={cnBubble("assistant")} style={{ maxWidth: "60%" }}>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-3 h-3 rounded-full bg-white/20 animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Suggested questions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {SUGGESTED.map((q) => (
          <button
            key={q}
            onClick={() => {
              setQuestion(q);
            }}
            className="px-3 py-2 rounded-lg border border-white/10 bg-white/3 text-xs text-white/70 text-left hover:bg-white/10 hover:border-white/20 transition-colors"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="rounded-xl border border-white/10 bg-white/5 p-2 flex gap-2">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={t("chatPlaceholder", language)}
          disabled={loading}
          className="flex-1 pl-4 pr-3 py-2.5 rounded-xl border border-white/20 bg-white/3 text-white focus:outline-none focus:border-green-400 placeholder-white/30 disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !question.trim()}
          className="px-5 py-2.5 rounded-xl bg-green-500 text-black font-bold hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? <RotateCw size={16} strokeWidth={2} className="animate-spin" /> : <Send size={16} strokeWidth={2} />}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-[10px] text-white/50">{t("demoNotice", language)}</p>
      </div>
    </div>
  );
}

function cnBubble(role: "user" | "assistant"): string {
  const base = "rounded-lg p-3 text-sm leading-relaxed";
  if (role === "user") return `${base} bg-green-500 text-black`;
  return `${base} bg-white/5 text-white border border-white/5`;
}
