import { test, expect } from '@playwright/test';
import { ChallengePage } from '../page-models/challenge-page';


test('test', async ({ page }) => {
  const challengePage = new ChallengePage(page);

  await challengePage.goto();

  await page.getByRole('link', { name: 'Challenges' }).click();
  await page.locator('form').filter({ hasText: 'submit Hint 0Hint 1Hint 2' }).getByRole('button').nth(2).click();
  await page.getByRole('button', { name: 'Close Hint' }).click();
});