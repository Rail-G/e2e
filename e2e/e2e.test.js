import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(40000);


describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`); // Не работает с webpack-dev-server@5. Нужна @4
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      // headless: true, // Без открытия браузера
      // slowMo: 100,
      // devtools: true, // show devTools
    });
  });

  test('accepted bank card', async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.type('.field', '5114142269515435')
    await page.click('.input-button')
    await page.waitForSelector('.field.accept')
  });

  test('not-accepted bank card', async () => {
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.type('.field', '5114142269515434')
    await page.click('.input-button')
    await page.waitForSelector('.field.not-accept')
  });

  afterAll(async () => {
    await browser.close();
    server.kill()
  });
});