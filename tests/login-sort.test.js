const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

describe('SauceDemo Automation', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    console.log('Menyiapkan browser...');
    driver = await new Builder().forBrowser('MicrosoftEdge').build();
  });

  after(async () => {
    console.log('Menutup browser...');
    await driver.quit();
  });

  it('Login sukses', async () => {
    await driver.get('https://www.saucedemo.com');
    await driver.findElement(By.id('user-name')).sendKeys('standard_user');
    await driver.findElement(By.id('password')).sendKeys('secret_sauce');
    await driver.findElement(By.id('login-button')).click();

    const title = await driver.getTitle();
    assert.strictEqual(title, 'Swag Labs');

    const logo = await driver.findElement(By.className('app_logo'));
    const logoText = await logo.getText();
    assert.strictEqual(logoText, 'Swag Labs');
  });

  it('Urutkan produk dari A ke Z', async () => {
    const dropdown = await driver.findElement(By.className('product_sort_container'));
    await dropdown.sendKeys('Name (A to Z)');

    const firstProduct = await driver.findElement(By.className('inventory_item_name'));
    const productName = await firstProduct.getText();
    console.log('Produk pertama setelah sorting:', productName);
  });
})