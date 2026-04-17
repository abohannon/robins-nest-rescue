import { test, expect } from "@playwright/test";

test.describe("/tours/confirmation page", () => {
  test("renders with no params (fallback)", async ({ page }) => {
    await page.goto("/tours/confirmation");

    const heading = page.getByRole("heading", {
      name: "You're Booked!",
      level: 1,
    });
    await expect(heading).toBeVisible();

    const subtext = page.getByText("We'll see you soon at the sanctuary.");
    await expect(subtext).toBeVisible();
  });

  test("renders with invitee name", async ({ page }) => {
    await page.goto("/tours/confirmation?invitee_full_name=Jane");

    const heading = page.getByRole("heading", {
      name: "You're Booked, Jane!",
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("renders with event time", async ({ page }) => {
    await page.goto(
      "/tours/confirmation?event_start_time=2026-04-20T08:30:00-07:00",
    );

    const subtext = page.getByText(/We'll see you on.*April 20.*8:30/);
    await expect(subtext).toBeVisible();
  });

  test("renders with both name and time", async ({ page }) => {
    await page.goto(
      "/tours/confirmation?invitee_full_name=Jane&event_start_time=2026-04-20T08:30:00-07:00",
    );

    const heading = page.getByRole("heading", {
      name: "You're Booked, Jane!",
      level: 1,
    });
    await expect(heading).toBeVisible();

    const subtext = page.getByText(/We'll see you on.*April 20.*8:30/);
    await expect(subtext).toBeVisible();
  });

  test("renders visitor guidelines", async ({ page }) => {
    await page.goto("/tours/confirmation");

    const heading = page.getByRole("heading", {
      name: "What to Know Before You Visit",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const items = page.locator("section ul li");
    await expect(items).toHaveCount(5);
  });

  test("renders the Getting Here section with map", async ({ page }) => {
    await page.goto("/tours/confirmation");

    const heading = page.getByRole("heading", {
      name: "Getting Here",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const address = page.getByText("16603 John Henry Lane, Ramona, CA 92065");
    await expect(address).toBeVisible();

    const mapIframe = page.locator('iframe[title*="Map showing"]');
    await expect(mapIframe).toBeAttached();
  });

  test("renders the closing donation CTA", async ({ page }) => {
    await page.goto("/tours/confirmation");

    const heading = page.getByRole("heading", {
      name: "Support the Sanctuary",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const donateLink = page.getByRole("link", { name: "Donate Now" });
    await expect(donateLink).toHaveAttribute("href", "/donate");
  });
});
