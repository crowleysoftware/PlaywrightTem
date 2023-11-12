import { expect, type Locator, type Page } from '@playwright/test';

export class ChallengePage {
    private page: Page;
    private welcomeChallengeTextBox: Locator;
    private welcomeChallengeSubmitButton: Locator;
    private welcomeChallengeClue: Locator;
    private incorrectHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.welcomeChallengeTextBox = this.page.getByTestId('Welcome Challenge');
        this.welcomeChallengeSubmitButton = this.page.getByTestId('Welcome Challenge submit-btn');
        this.welcomeChallengeClue = this.page.getByTestId('Welcome Challenge desc');
        this.incorrectHeader = this.page.getByRole('heading', { name: 'INCORRECT' });
    }

    async goto() {
        await this.page.goto('https://localhost:5001/Challenges');
      //  await this.page.getByRole('link', { name: 'Challenges' }).click();
    }

    async submtIncorrectWelcomeChallenge() {
        await this.welcomeChallengeTextBox.click();
        await this.welcomeChallengeTextBox.fill('this is obviously wrong');
        await this.welcomeChallengeSubmitButton.click();
        await expect(this.incorrectHeader).toBeVisible();
    }

    async submitCorrectWelcomeChallenge() {
        //get value of challenge clue
        const challengeClue = await this.welcomeChallengeClue.innerText();
        //base 64 decode the challenge clue
        const decodedChallengeClue = Buffer.from(challengeClue, 'base64').toString('ascii');
        //submit the challenge clue
        await this.welcomeChallengeTextBox.click();
        await this.welcomeChallengeTextBox.fill(decodedChallengeClue);
        await this.welcomeChallengeSubmitButton.click();
        //expect the challenge to be solved
        await expect(this.page.getByTestId('Welcome Challenge solved')).toBeVisible();
    }
}