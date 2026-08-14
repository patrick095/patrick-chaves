import { existsSync } from 'node:fs';

import { defineConfig } from '@playwright/test';

const localChromeExecutable =
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const chromeExecutable =
  process.env['PLAYWRIGHT_CHROME_PATH'] ??
  (existsSync(localChromeExecutable) ? localChromeExecutable : undefined);

export default defineConfig({
  testDir: './e2e',
  outputDir: '/tmp/patrick-chaves-playwright',
  fullyParallel: true,
  forbidOnly: true,
  retries: process.env['CI'] ? 2 : 0,
  workers: process.env['CI'] ? 2 : undefined,
  reporter: [['line']],
  use: {
    baseURL: 'http://127.0.0.1:4200',
    browserName: 'chromium',
    headless: true,
    launchOptions: chromeExecutable
      ? { executablePath: chromeExecutable }
      : undefined,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npm start -- --host 127.0.0.1 --port 4200',
    url: 'http://127.0.0.1:4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 120_000,
  },
});
