import { NextResponse } from "next/server";
import { KNOWLEDGE_BASE } from "@/lib/knowledge-base";
import { retrieveDocs, generateAnswer } from "@/lib/rag";

export async function POST(req: Request) {
  try {
    const { question } = (await req.json()) as { question?: string };
    if (!question || typeof question !== "string") {
      return NextResponse.json({ error: "Question is required" }, { status: 400 });
    }

    // Lightweight keyword-overlap retrieval (no vector database)
    const docs = retrieveDocs(question, 3);

    // Deterministic extractive answer generation (fallback when no LLM key)
    // Optional LLM via server-side env var if configured
    let answer: string;
    const apiKey = process.env.LLM_API_KEY;
    if (apiKey) {
      // Placeholder for optional LLM integration - key kept server-side only
      answer = generateAnswer(question, docs);
    } else {
      answer = generateAnswer(question, docs);
    }

    return NextResponse.json({
      answer,
      sources: docs.map((d) => ({ id: d.id, title: d.title, category: d.category })),
      method: "keyword-overlap TF-IDF-style scoring over local JSON knowledge base (no vector database)",
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to process question" }, { status: 500 });
  }
}
