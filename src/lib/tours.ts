export const SANCTUARY_ADDRESS = "16603 John Henry Lane, Ramona, CA 92065";

export const CALENDLY_URL =
  "https://calendly.com/booking-robinsnestramona/rescue-ranch-tour?hide_gdpr_banner=1";

/**
 * Sanitize a display name from Calendly query params.
 * Strips anything that isn't a letter, space, hyphen, or apostrophe,
 * then truncates to 50 characters.
 */
export function sanitizeName(raw: string): string {
  return raw
    .replace(/[^a-zA-Z\s'-]/g, "")
    .trim()
    .slice(0, 50);
}

export const BOOKING_EMAIL = "booking@robinsnestrescue.com";

export const TOUR_PRICING_TIERS = [
  { range: "1–5 guests", amount: "$60" },
  { range: "6–10 guests", amount: "$100" },
  { range: "11–15 guests", amount: "$150" },
  { range: "16–20 guests", amount: "$200" },
  { range: "21+ guests", amount: "Get in touch", isCallout: true },
] as const;
