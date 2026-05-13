import { describe, it, expect } from "vitest";
import { TOUR_PRICING_TIERS, BOOKING_EMAIL } from "./tours";

describe("TOUR_PRICING_TIERS", () => {
  it("has exactly 5 tiers", () => {
    expect(TOUR_PRICING_TIERS).toHaveLength(5);
  });

  it("matches the documented ladder", () => {
    expect(TOUR_PRICING_TIERS).toEqual([
      { range: "1–5 guests", amount: "$60" },
      { range: "6–10 guests", amount: "$100" },
      { range: "11–15 guests", amount: "$150" },
      { range: "16–20 guests", amount: "$200" },
      { range: "21+ guests", amount: "Get in touch" },
    ]);
  });
});

describe("BOOKING_EMAIL", () => {
  it("is the sanctuary booking address", () => {
    expect(BOOKING_EMAIL).toBe("booking@robinsnestrescue.com");
  });
});
