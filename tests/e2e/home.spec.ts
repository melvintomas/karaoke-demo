import { expect, test } from "@playwright/test";

test("homepage loads the phase a shell", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Build the karaoke room before the first song starts.",
    }),
  ).toBeVisible();
});
