
import {
    setWorldConstructor,
    World as CucumberWorld
} from '@cucumber/cucumber';

import {
    Browser,
    BrowserContext,
    Page,
    chromium
} from '@playwright/test';

import fs from 'fs/promises';
import path from 'path';

export class World extends CucumberWorld {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    videoDir!: string;

    async init(
        featureName: string,
        scenarioName: string,
        exampleName: string
    ) {
        this.videoDir = path.join(
            'output',
            featureName,
            scenarioName,
            ...(exampleName ? [exampleName] : [])
        );

        await fs.mkdir(this.videoDir, { recursive: true });

        this.browser = await chromium.launch({
            headless: false
        });

        this.context = await this.browser.newContext({
            recordVideo: {
                dir: this.videoDir
            }
        });

        this.page = await this.context.newPage();
    }

    async close() {
        try {
            if (this.page && !this.page.isClosed()) {
                await this.page.screenshot({
                    path: path.join(
                        this.videoDir,
                        'final-screenshot.png'
                    ),
                    fullPage: true
                });
            }
        } finally {
            if (this.context) {
                await this.context.close();
            }

            if (this.browser) {
                await this.browser.close();
            }
        }
    }
}

setWorldConstructor(World);
