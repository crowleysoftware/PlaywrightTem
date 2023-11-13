import { expect, type Locator, type Page } from "@playwright/test";
import exp from "constants";

export class LeaderboardPage {
  private page: Page;
  leaderboardLocator: Locator;
  erlichLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.leaderboardLocator = this.page.getByText(
      "Leaderboard # Hacker Total Last Solve"
    );
    this.erlichLocator = this.page.getByRole("cell", {
      name: "Erlich Bachman",
    });
  }

  async goto() {
    await this.page.goto("https://localhost:5001/Leaderboard");
  }

  async isNotOnLeaderboard(hackerName: string) {
    await expect(this.erlichLocator).toBeVisible();
    await expect(this.leaderboardLocator).not.toHaveText(hackerName);
  }

  async isOnLeaderboard(hackerName: string) {
    await expect(this.erlichLocator).toBeVisible();

    await expect(
      this.page.getByRole("cell", {
        name: hackerName,
      })
    ).toBeVisible();
  }
}
