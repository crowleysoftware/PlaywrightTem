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

  test("submit-incorrect-welcome-challenge", async () => {
    await challengePage.submtIncorrectWelcomeChallenge();
  });

  test("submit-correct-welcome-challenge", async () => {
    await challengePage.submitCorrectWelcomeChallenge();
  });
});

async function resetDatabase() {
   //call api to reset the database
   const ctx: APIRequestContext = await request.newContext();
   ctx.post('http://localhost:5258/reset');
}
