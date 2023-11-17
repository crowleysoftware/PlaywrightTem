import {
  test,
  expect,
  Page,
  request,
  APIRequestContext,
} from "@playwright/test";
import { ChallengePage } from "../page-models/challenge-page";
import { LeaderboardPage } from "../page-models/leaderboard-page";

const baseUrl = "https://localhost:5001/";
const danteHackerName = "<script>alert('got you');</script>";

test("leaderboard test", async ({ page }) => {
  const leaderboardPage = new LeaderboardPage(page);
  await leaderboardPage.goto();
  await leaderboardPage.isNotOnLeaderboard(danteHackerName);
});

test.describe("submit-welcome-challenge", async () => {
  let page: Page;
  let challengePage: ChallengePage;
  let leaderboardPage: LeaderboardPage;

  test.beforeAll(async ({ browser }) => {
    await resetDatabase();

    page = await browser.newPage();
    leaderboardPage = new LeaderboardPage(page);
    challengePage = new ChallengePage(page);
    await page.goto(baseUrl);
  });

  test.afterAll(async () => {
    await resetDatabase();
    await page.close();
  });

  //validate hacker is not on leader board until they solve the challenge
  test("hacker-gets-on-leaderboard", async () => {
    await leaderboardPage.goto();
    await leaderboardPage.isNotOnLeaderboard(danteHackerName);

    await challengePage.goto();
    await challengePage.submtIncorrectWelcomeChallenge();

    //validate hacker is STILL not on leader board
    await leaderboardPage.goto();
    await leaderboardPage.isNotOnLeaderboard(danteHackerName);

    await challengePage.goto();
    await challengePage.submitCorrectWelcomeChallenge();

    //validate hacker is on leader board
    await leaderboardPage.goto();
    await leaderboardPage.isOnLeaderboard(danteHackerName);
  });
});

async function resetDatabase() {
  //call api to reset the database
  const ctx: APIRequestContext = await request.newContext();
  ctx.post("http://localhost:5258/reset");
}
