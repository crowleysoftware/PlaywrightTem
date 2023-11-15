import {test as setup, expect} from '@playwright/test';
import exp from 'constants';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {

    await page.goto('https://localhost:5001/');
    await page.getByRole('link', { name: 'Log in', exact: false }).click();
    await page.getByPlaceholder('Email, phone, or Skype').click();
    await page.getByPlaceholder('Email, phone, or Skype').fill('dante.hicks@crowleysoftwarellc.onmicrosoft.com');
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill(process.env.DANTE_PASSWORD ?? 'wrong password!');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();

    await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();

    await page.context().storageState({ path: authFile });
});