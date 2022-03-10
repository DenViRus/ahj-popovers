import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('Popover form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('click Green', async () => {
    await page.goto(baseUrl);
    const items = await page.$$('.popover-image');
    await items[0].click();
    await page.waitForSelector('.popover-message', { visible: true });
  });
  test('click Violet', async () => {
    await page.goto(baseUrl);
    const items = await page.$$('.popover-image');
    await items[1].click();
    await page.waitForSelector('.popover-message', { visible: true });
  });
  test('click Red', async () => {
    await page.goto(baseUrl);
    const items = await page.$$('.popover-image');
    await items[2].click();
    await page.waitForSelector('.popover-message', { visible: true });
  });
});
