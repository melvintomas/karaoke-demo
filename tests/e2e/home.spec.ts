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
  await expect(page.getByText("You're the first singer here.")).toBeVisible();
  await expect(page.getByText("No songs queued yet")).toBeVisible();
});

test("a second browser session can join the host's room", async ({ browser }) => {
  const hostContext = await browser.newContext();
  const hostPage = await hostContext.newPage();

  await hostPage.goto("/");
  await hostPage.getByLabel("Your display name").fill("Alex");
  await hostPage.getByRole("button", { name: "Create room" }).click();

  await expect(hostPage).toHaveURL(/\/rooms\/([A-Z0-9]+)\?participant=/);

  const roomCode = hostPage.url().match(/\/rooms\/([A-Z0-9]+)\?participant=/)?.[1];

  expect(roomCode).toBeTruthy();

  const guestContext = await browser.newContext();
  const guestPage = await guestContext.newPage();

  await guestPage.goto("/");
  await guestPage.getByLabel("Room code").fill(roomCode ?? "");
  await guestPage.getByRole("textbox", { name: "Display name", exact: true }).fill("Sam");
  await guestPage.getByRole("button", { name: "Join room" }).click();

  await expect(guestPage).toHaveURL(new RegExp(`/rooms/${roomCode}\\?participant=`));
  await expect(guestPage.getByText("Alex", { exact: true })).toBeVisible();
  await expect(guestPage.getByText("Sam (You)")).toBeVisible();

  await hostPage.reload();
  await expect(hostPage.getByText("Alex (You)")).toBeVisible();
  await expect(hostPage.getByText("Sam", { exact: true })).toBeVisible();

  await hostContext.close();
  await guestContext.close();
});
