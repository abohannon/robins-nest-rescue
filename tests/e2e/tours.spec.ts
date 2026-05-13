import { test, expect } from "@playwright/test";

test.describe("/tours page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tours");
  });

  test("renders the hero with correct heading", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "An Immersive Farm Experience",
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("Reserve Your Visit CTA links to the booking section", async ({
    page,
  }) => {
    const reserveLink = page.getByRole("link", { name: "Reserve Your Visit" });
    await expect(reserveLink).toHaveAttribute("href", "#book");
  });

  test("renders the What to Expect section", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "What to Expect",
      level: 2,
    });
    await expect(heading).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Meet the Animals", level: 3 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Feed the Critters", level: 3 }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Lend a Hand", level: 3 }),
    ).toBeVisible();
  });

  test("renders the Reserve Your Experience section", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "Reserve Your Experience",
      level: 2,
    });
    await expect(heading).toBeVisible();
  });

  test("Calendly embed container is present", async ({ page }) => {
    const container = page.locator("#calendly-embed");
    await expect(container).toBeAttached();
  });

  test("renders the Suggested Donation section with all tiers", async ({
    page,
  }) => {
    const heading = page.getByRole("heading", {
      name: "Suggested Donation",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const pricingSection = page.locator("section").filter({ has: heading });

    for (const amount of ["$60", "$100", "$150", "$200", "Get in touch"]) {
      await expect(pricingSection.getByText(amount)).toBeVisible();
    }

    const emailLink = pricingSection.getByRole("link", {
      name: "booking@robinsnestrescue.com",
    });
    await expect(emailLink).toHaveAttribute(
      "href",
      "mailto:booking@robinsnestrescue.com",
    );
  });

  test("renders visitor guidelines", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "What to Know Before You Visit",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const guidelinesSection = page.locator("section").filter({ has: heading });
    const items = guidelinesSection.locator("ul li");
    await expect(items).toHaveCount(5);
  });

  test("renders the Find Us section with map", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "Find Us",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const address = page.getByText("16603 John Henry Lane, Ramona, CA 92065");
    await expect(address).toBeVisible();

    const mapIframe = page.locator('iframe[title*="Map showing"]');
    await expect(mapIframe).toBeAttached();
  });

  test("renders the closing donation CTA", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "Support the Sanctuary",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const donateLink = page.getByRole("link", { name: "Donate Now" });
    await expect(donateLink).toHaveAttribute("href", "/donate");
  });
});
