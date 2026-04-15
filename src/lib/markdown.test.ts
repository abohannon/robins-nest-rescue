import { describe, it, expect } from "vitest";
import { renderMarkdown } from "./markdown";

describe("renderMarkdown", () => {
  it("converts markdown to HTML", () => {
    const result = renderMarkdown("**bold** text");
    expect(result).toContain("<strong>bold</strong>");
    expect(result).toContain("text");
  });

  it("converts line breaks", () => {
    const result = renderMarkdown("line one\n\nline two");
    expect(result).toContain("<p>line one</p>");
    expect(result).toContain("<p>line two</p>");
  });

  it("converts links", () => {
    const result = renderMarkdown("[click here](https://example.com)");
    expect(result).toContain('<a href="https://example.com">click here</a>');
  });

  it("returns empty string for empty input", () => {
    expect(renderMarkdown("")).toBe("");
  });
});
