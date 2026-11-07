export async function sendMessage(question: string): Promise<{ answer: string; sources: any[] }> {
  if (typeof window === "undefined") {
    return { answer: "", sources: [] };
  }
  const res = await fetch("/api/rag", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error("RAG request failed");
  return res.json();
}
