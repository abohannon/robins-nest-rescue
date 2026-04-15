import { marked } from "marked";

export function renderMarkdown(markdown: string): string {
  if (!markdown) return "";
  return marked.parse(markdown, { async: false }) as string;
}
