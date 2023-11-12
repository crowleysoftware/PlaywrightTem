import { expect, type Locator, type Page } from '@playwright/test';

export class ChallengePage {
    private page: Page;
    private challengePage: Locator;
    private hintButton: Locator;
    private hintCloseButton: Locator;
    private submitButton: Locator;
    private submitHintButton: Locator;
    private submitHintInput: Locator;
    private submitHintCloseButton: Locator;
    private hint: Locator;
    private hintClose: Locator;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://localhost:5001/');
    }
}