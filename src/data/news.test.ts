import { describe, it, expect } from "vitest";
import { newsItems, getSortedNewsItems } from "./news";

describe("newsItems", () => {
  it("contains at least one item", () => {
    expect(newsItems.length).toBeGreaterThan(0);
  });

  it("each item has required fields", () => {
    for (const item of newsItems) {
      expect(item.title).toBeTruthy();
      expect(item.source).toBeTruthy();
      expect(item.date).toBeTruthy();
      expect(item.url).toBeTruthy();
      expect(item.image).toBeTruthy();
    }
  });

  it("each date is an ISO YYYY-MM-DD string", () => {
    const isoRe = /^\d{4}-\d{2}-\d{2}$/;
    for (const item of newsItems) {
      expect(item.date).toMatch(isoRe);
    }
  });

  it("each url starts with http", () => {
    for (const item of newsItems) {
      expect(item.url).toMatch(/^https?:\/\//);
    }
  });
});

describe("getSortedNewsItems", () => {
  it("returns items sorted by date descending (newest first)", () => {
    const sorted = getSortedNewsItems();
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i - 1].date >= sorted[i].date).toBe(true);
    }
  });

  it("returns the same number of items as newsItems", () => {
    expect(getSortedNewsItems().length).toBe(newsItems.length);
  });

  it("does not mutate the source array", () => {
    const before = newsItems.map((n) => n.date).join(",");
    getSortedNewsItems();
    const after = newsItems.map((n) => n.date).join(",");
    expect(after).toBe(before);
  });
});
