import {
  test,
  expect,
  Page,
  request,
  APIRequestContext,
} from "@playwright/test";
import { ChallengePage } from "../page-models/challenge-page";
import { LeaderboardPage } from "../page-models/leaderboard-page";

test.describe("submit-welcome-challenge", async () => {
  let page: Page;
  let challengePage: ChallengePage;
  let leaderboardPage: LeaderboardPage;

  test.beforeAll(async ({ browser }) => {
    await resetDatabase();
    
    page = await browser.newPage();
    leaderboardPage = new LeaderboardPage(page);
    challengePage = new ChallengePage(page);
    await page.goto("https://localhost:5001/");
  });

  test.afterAll(async () => {
    await resetDatabase();
  });

  //validate hacker is not on leader board until they solve the challenge
  test("hacker-gets-on-leaderboard", async () => {

    //await leaderboardPage.goto();
    await page.goto("https://localhost:5001/Leaderboard");
    await leaderboardPage.isNotOnLeaderboard('<script>alert(\'got you\');</script>');
    
    await challengePage.goto();
    await challengePage.submtIncorrectWelcomeChallenge();

  //validate hacker is STILL not on leader board
    //await leaderboardPage.goto();
    await page.goto("https://localhost:5001/Leaderboard");
    await leaderboardPage.isNotOnLeaderboard('<script>alert(\'got you\');</script>');
    
    await challengePage.goto();
    await challengePage.submitCorrectWelcomeChallenge();

  //validate hacker is on leader board
    //await leaderboardPage.goto();
    await page.goto("https://localhost:5001/Leaderboard");
    await leaderboardPage.isOnLeaderboard('<script>alert(\'got you\');</script>');
  });
});

async function resetDatabase() {
   //call api to reset the database
   const ctx: APIRequestContext = await request.newContext();
   ctx.post('http://localhost:5258/reset');
}
