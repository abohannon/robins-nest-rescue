import { test, expect } from "@playwright/test";

async function openDonateModal(
  page: import("@playwright/test").Page,
  isMobile: boolean,
) {
  await page.goto("/");

  if (isMobile) {
    await page.locator("#nav-toggle").click();
    // Wait for the mobile menu animation to complete
    await page.locator("#nav-menu[data-open='true']").waitFor();
  }

  const donateButton = page.locator("[data-donate-button]:visible").first();
  await expect(donateButton).toBeVisible();
  await donateButton.click();
}

test.describe("Donate Button & Modal", () => {
  test("donate button in nav opens the modal", async ({ page, isMobile }) => {
    await openDonateModal(page, !!isMobile);

    const modal = page.locator("#donate-modal");
    await expect(modal).toBeVisible();
  });

  test("modal closes on close button click", async ({ page, isMobile }) => {
    await openDonateModal(page, !!isMobile);

    const modal = page.locator("#donate-modal");
    await expect(modal).toBeVisible();

    await page.locator("#donate-modal-close").click();
    await expect(modal).not.toBeVisible();
  });

  test("modal closes on Escape key", async ({ page, isMobile }) => {
    await openDonateModal(page, !!isMobile);

    const modal = page.locator("#donate-modal");
    await expect(modal).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(modal).not.toBeVisible();
  });

  test("modal closes on backdrop click", async ({ page, isMobile }) => {
    await openDonateModal(page, !!isMobile);

    const modal = page.locator("#donate-modal");
    await expect(modal).toBeVisible();

    // Click the dialog element itself (backdrop area) at position 0,0
    // which is outside the inner content
    await modal.click({ position: { x: 0, y: 0 } });
    await expect(modal).not.toBeVisible();
  });

  test("givebutter widget is present in modal", async ({ page, isMobile }) => {
    await openDonateModal(page, !!isMobile);

    const widget = page.locator("#donate-modal givebutter-widget");
    await expect(widget).toBeAttached();
  });

  test("modal has accessible heading", async ({ page, isMobile }) => {
    await openDonateModal(page, !!isMobile);

    const heading = page.locator("#donate-modal-title");
    await expect(heading).toHaveText("Donate");
  });

  test("close button has aria-label", async ({ page, isMobile }) => {
    await openDonateModal(page, !!isMobile);

    const closeBtn = page.locator("#donate-modal-close");
    await expect(closeBtn).toHaveAttribute("aria-label", "Close donation form");
  });
});

test.describe("/donate fallback page", () => {
  test("renders the inline donation form", async ({ page }) => {
    await page.goto("/donate");

    const heading = page.getByRole("heading", {
      name: "Support Our Mission",
      level: 1,
    });
    await expect(heading).toBeVisible();

    const widget = page.locator("main givebutter-widget");
    await expect(widget).toBeAttached();
  });
});
