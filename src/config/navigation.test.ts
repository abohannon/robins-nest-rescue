import { describe, it, expect } from "vitest";
import { navLinks, navActions } from "./navigation";

describe("navigation config", () => {
  it("exports navLinks with required fields", () => {
    expect(navLinks.length).toBeGreaterThan(0);
    for (const link of navLinks) {
      expect(link).toHaveProperty("label");
      expect(link).toHaveProperty("href");
      expect(link.href).toMatch(/^\//);
    }
  });

  it("exports navActions with required fields", () => {
    expect(navActions.length).toBeGreaterThan(0);
    for (const action of navActions) {
      expect(action).toHaveProperty("label");
      expect(action).toHaveProperty("href");
      expect(action).toHaveProperty("style");
      expect(["primary", "accent"]).toContain(action.style);
    }
  });

  it("navLinks does not include Home (logo handles that)", () => {
    const homeLink = navLinks.find((link) => link.href === "/");
    expect(homeLink).toBeUndefined();
  });

  it("navActions includes Book a Tour and Donate", () => {
    const labels = navActions.map((a) => a.label);
    expect(labels).toContain("Book a Tour");
    expect(labels).toContain("Donate");
  });
});
