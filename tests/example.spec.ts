import {
  test,
  expect,
  Page,
  request,
  APIRequestContext,
} from "@playwright/test";
import { ChallengePage } from "../page-models/challenge-page";

test.describe("submit-welcome-challenge", async () => {
  let page: Page;
  let challengePage: ChallengePage;

  test.beforeAll(async ({ browser }) => {
    await resetDatabase();

    page = await browser.newPage();
    challengePage = new ChallengePage(page);
    await challengePage.goto();
  });

  test.afterAll(async () => {
    await resetDatabase();
  });

  //TODO: validate hacker is not on leader board

  test("submit-incorrect-welcome-challenge", async () => {
    await challengePage.submtIncorrectWelcomeChallenge();
  });

  //TODO: validate hacker is STILL not on leader board

  test("submit-correct-welcome-challenge", async () => {
    await challengePage.submitCorrectWelcomeChallenge();
  });

  //TODO: validate hacker is on leader board
  
});

async function resetDatabase() {
   //call api to reset the database
   const ctx: APIRequestContext = await request.newContext();
   ctx.post('http://localhost:5258/reset');
}
