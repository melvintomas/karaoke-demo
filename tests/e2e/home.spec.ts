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

test("host can create a room and land in the lobby", async ({ page }) => {
  await page.goto("/");

  await page.getByLabel("Your display name").fill("Jordan");
  await page.getByLabel("Room name").fill("Jordan's Garage Session");
  await page.getByRole("button", { name: "Create room" }).click();

  await expect(page).toHaveURL(/\/rooms\/[A-Z0-9]+\?participant=/);
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Jordan's Garage Session",
    }),
  ).toBeVisible();
  await expect(page.getByText("Jordan (You)")).toBeVisible();
  await expect(page.getByText("No songs queued yet")).toBeVisible();
});
