import KNOWLEDGE_BASE from "./knowledge-base.json";
export { KNOWLEDGE_BASE };

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: string;
  content: string;
}
