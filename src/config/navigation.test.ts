import { describe, it, expect } from "vitest";
import { navLinks, navActions, isInHeader, isInFooter } from "./navigation";

describe("navigation config", () => {
  it("exports navLinks with required fields", () => {
    expect(navLinks.length).toBeGreaterThan(0);
    for (const link of navLinks) {
      expect(link).toHaveProperty("label");
      expect(link).toHaveProperty("href");
      expect(link.href).toMatch(/^(\/|https?:\/\/)/);
    }
  });

  it("links default to appearing in both header and footer", () => {
    const link = { label: "Test", href: "/test" };
    expect(isInHeader(link)).toBe(true);
    expect(isInFooter(link)).toBe(true);
  });

  it("placement: 'footer' excludes link from header", () => {
    const link = { label: "Test", href: "/test", placement: "footer" as const };
    expect(isInHeader(link)).toBe(false);
    expect(isInFooter(link)).toBe(true);
  });

  it("placement: 'header' excludes link from footer", () => {
    const link = { label: "Test", href: "/test", placement: "header" as const };
    expect(isInHeader(link)).toBe(true);
    expect(isInFooter(link)).toBe(false);
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

  it("navActions includes Book a Tour", () => {
    const labels = navActions.map((a) => a.label);
    expect(labels).toContain("Book a Tour");
  });

  it("navActions does not include Donate (handled by DonateButton component)", () => {
    const labels = navActions.map((a) => a.label);
    expect(labels).not.toContain("Donate");
  });
});
