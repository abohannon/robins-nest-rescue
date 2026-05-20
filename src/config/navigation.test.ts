import { describe, it, expect } from "vitest";
import {
  navLinks,
  navActions,
  isInHeader,
  isInFooter,
  isActiveLink,
} from "./navigation";

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

  it("About link exposes children submenu items", () => {
    const aboutLink = navLinks.find((link) => link.href === "/about");
    expect(aboutLink).toBeDefined();
    expect(aboutLink?.children).toBeDefined();
    expect(aboutLink?.children?.length).toBeGreaterThan(0);
    for (const child of aboutLink?.children ?? []) {
      expect(child).toHaveProperty("label");
      expect(child).toHaveProperty("href");
      expect(child.href).toMatch(/^(\/|https?:\/\/)/);
    }
  });

  it("About children include the required first-version items", () => {
    const aboutLink = navLinks.find((link) => link.href === "/about");
    const labels = aboutLink?.children?.map((c) => c.label) ?? [];
    expect(labels).toEqual(
      expect.arrayContaining([
        "Founder's Story",
        "Mission and Vision",
        "Team",
        "Board & Advisory Council",
        "In the News",
        "FAQ",
      ]),
    );
  });
});

describe("isActiveLink", () => {
  it("matches exact path", () => {
    expect(isActiveLink("/about", "/about")).toBe(true);
  });

  it("matches child route under the link", () => {
    expect(isActiveLink("/about", "/about/team")).toBe(true);
    expect(isActiveLink("/about", "/about/founders-story")).toBe(true);
  });

  it("does not match unrelated path", () => {
    expect(isActiveLink("/about", "/animals")).toBe(false);
    expect(isActiveLink("/about", "/aboutness")).toBe(false);
  });

  it("home only matches exactly", () => {
    expect(isActiveLink("/", "/")).toBe(true);
    expect(isActiveLink("/", "/about")).toBe(false);
  });

  it("external links only match exactly", () => {
    expect(isActiveLink("https://example.com", "https://example.com")).toBe(
      true,
    );
    expect(isActiveLink("https://example.com", "/something")).toBe(false);
  });
});
