import { test, expect, Page, request, APIRequestContext } from '@playwright/test';
import { ChallengePage } from '../page-models/challenge-page';

test.describe('submit-welcome-challenge', async () => {
  
  let page: Page;
  let challengePage: ChallengePage;  

  test.beforeAll(async ({ browser }) => {
    //call api to reset the database
    const ctx: APIRequestContext = await request.newContext();
    ctx.post('https://localhost:5001/api/reset');
    
    page = await browser.newPage();
    challengePage = new ChallengePage(page);
    await challengePage.goto();
  });

  test('submit-incorrect-welcome-challenge', async () => {   
    await challengePage.submtIncorrectWelcomeChallenge();
  });

  test('submit-correct-welcome-challenge', async () => {   
    await challengePage.submitCorrectWelcomeChallenge();
  });

});

