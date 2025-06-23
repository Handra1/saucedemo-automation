const { Builder, By } = require('selenium-webdriver');
const assert = require('assert');

describe('SauceDemo Automation', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('MicrosoftEdge').build(); // Ganti 'chrome' jika pakai Chrome
  });

  after(async () => {
    await driver.quit();
  });

  it('Login sukses dan urutkan produk A-Z', async () => {
    await driver.get('https://www.saucedemo.com');

    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    const title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs');

    const sortDropdown = await driver.findElement(By.className('product_sort_container'));
    await sortDropdown.sendKeys('Name (A to Z)');

    const firstProduct = await driver.findElement(By.className('inventory_item_name'));
    const productName = await firstProduct.getText();
    console.log('Produk pertama setelah disortir:', productName);
  });
})