import type { Career } from "./data";
import { KNOWLEDGE_BASE, type KnowledgeDoc } from "./knowledge-base";

export const ROADMAP_STAGES = [
  { id: "python", title: "Python Fundamentals", description: "Learn Python syntax, data types, control flow, functions, and modules." },
  { id: "math", title: "Mathematics and Statistics", description: "Study linear algebra, calculus, probability, and statistics for ML." },
  { id: "ml", title: "Machine Learning", description: "Learn supervised/unsupervised learning, regression, classification, and scikit-learn." },
  { id: "dl", title: "Deep Learning", description: "Study neural networks, TensorFlow/PyTorch, CNNs, and RNNs." },
  { id: "projects", title: "Projects and Portfolio", description: "Build end-to-end AI projects and host them on GitHub." },
  { id: "interview", title: "Interview Preparation", description: "Practice ML interviews, system design, and coding problems." },
];

export function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9\s]/gi, " ").replace(/\s+/g, " ").trim();
}

export function tokenize(text: string): string[] {
  return normalizeText(text).split(/\s+/).filter(Boolean);
}

export function scoreDocument(query: string, doc: KnowledgeDoc): number {
  const queryTokens = new Set(tokenize(query));
  const docText = `${doc.title} ${doc.content}`;
  const docTokens = tokenize(docText);
  let matches = 0;
  for (const token of queryTokens) {
    if (docTokens.includes(token)) matches += 1;
  }
  return queryTokens.size === 0 ? 0 : matches / queryTokens.size;
}

export function retrieveDocs(query: string, topK = 3): KnowledgeDoc[] {
  const scored = KNOWLEDGE_BASE.map((doc) => ({ doc, score: scoreDocument(query, doc) })).filter((d) => d.score > 0);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK).map((d) => d.doc);
}

export function generateAnswer(query: string, docs: KnowledgeDoc[]): string {
  if (docs.length === 0) {
    return "I could not find relevant information in the knowledge base. Try rephrasing your question.";
  }
  const top = docs[0];
  const sentences = top.content.split(/(?<=[.!?])\s+/).filter(Boolean);
  const relevant = sentences.filter((s) => tokenize(query).some((t) => s.toLowerCase().includes(t)));
  const answer = relevant.length > 0 ? relevant.slice(0, 2).join(" ") : top.content.slice(0, 300);
  return `${answer}\n\nBased on: "${top.title}".`;
}

export function findCareerById(id: string): Career | undefined {
  return (globalThis as unknown as { __careers?: Career[] }).__careers?.find((c) => c.id === id);
}

export { KNOWLEDGE_BASE };
