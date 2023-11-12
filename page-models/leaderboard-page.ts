import { expect, type Locator, type Page } from "@playwright/test";
import exp from "constants";

export class LeaderboardPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://localhost:5001/Leaderboard");
  }

  async isNotOnLeaderboard(hackerName: string) {
    expect(
      this.page.getByRole("cell", { name: '<script>alert(\'got you\');</script>' })
    ).not.toBeAttached();
  }

  async isOnLeaderboard(hackerName: string) {
    expect(
      this.page.getByRole("cell", { name: '<script>alert(\'got you\');</script>' })
    ).toBeAttached();
  }
}
