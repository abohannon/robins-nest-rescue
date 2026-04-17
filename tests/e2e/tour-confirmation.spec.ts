import { test, expect } from "@playwright/test";

test.describe("/tours/confirmation page", () => {
  test("renders with no params (fallback)", async ({ page }) => {
    await page.goto("/tours/confirmation");

    const heading = page.getByRole("heading", {
      name: "Almost There!",
      level: 1,
    });
    await expect(heading).toBeVisible();

    const subtext = page.getByText("We'll see you soon at the sanctuary.");
    await expect(subtext).toBeVisible();
  });

  test("renders with first name from invitee_first_name", async ({ page }) => {
    await page.goto("/tours/confirmation?invitee_first_name=Adam");

    const heading = page.getByRole("heading", {
      name: "Almost There, Adam!",
      level: 1,
    });
    await expect(heading).toBeVisible();
  });

  test("extracts first name from invitee_full_name when first_name is empty", async ({
    page,
  }) => {
    await page.goto(
      "/tours/confirmation?invitee_first_name=&invitee_full_name=Jane+Smith",
    );

    const heading = page.getByRole("heading", {
      name: "Almost There, Jane!",
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
      "/tours/confirmation?invitee_first_name=Jane&event_start_time=2026-04-20T08:30:00-07:00",
    );

    const heading = page.getByRole("heading", {
      name: "Almost There, Jane!",
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

  test("renders the payment section with GiveButter widget", async ({
    page,
  }) => {
    await page.goto("/tours/confirmation");

    const heading = page.getByRole("heading", {
      name: "Complete Your Booking",
      level: 2,
    });
    await expect(heading).toBeVisible();

    const donationText = page.getByText(/minimum donation of \$60/);
    await expect(donationText).toBeVisible();

    const widget = page.locator('givebutter-widget[id="gKZZE3"]');
    await expect(widget).toBeAttached();
  });
});
