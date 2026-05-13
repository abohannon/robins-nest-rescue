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
