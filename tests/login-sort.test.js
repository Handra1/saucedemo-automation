import { Builder, By, until } from 'selenium-webdriver';
import assert from 'assert';
import fs from 'fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import PageLogin from '../pages/page_login.js';

describe('SauceDemo Automation', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Login sukses', async () => {
    await driver.get('https://www.saucedemo.com');

    const username = await driver.findElement(PageLogin.inputUsername);
    await username.sendKeys('standard_user');

    const password = await driver.findElement(PageLogin.inputPassword);
    await password.sendKeys('secret_sauce');

    const loginBtn = await driver.findElement(PageLogin.buttonLogin);
    await loginBtn.click();

    const title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs');
  });

  it('Urutkan produk dari A ke Z', async () => {
    const sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.sendKeys('Name (A to Z)');

    const firstProduct = await driver.findElement(By.className('inventory_item_name'));
    const productName = await firstProduct.getText();
    console.log('Produk pertama setelah sorting:', productName);
  });

  it('Cek visual halaman login', async () => {
    await driver.get('https://www.saucedemo.com');

    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync('current.png', Buffer.from(screenshot, 'base64'));

    if (!fs.existsSync('baseline.png')) {
      fs.writeFileSync('baseline.png', Buffer.from(screenshot, 'base64'));
      console.log('✅ Baseline dibuat. Jalankan ulang test ini untuk membandingkan.');
      return;
    }

    const baseline = PNG.sync.read(fs.readFileSync('baseline.png'));
    const current = PNG.sync.read(fs.readFileSync('current.png'));
    const { width, height } = baseline;
    const diff = new PNG({ width, height });

    const numDiffPixels = pixelmatch(
      baseline.data,
      current.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    fs.writeFileSync('diff.png', PNG.sync.write(diff));
    console.log(`🎯 Jumlah perbedaan pixel: ${numDiffPixels}`);
  });
})