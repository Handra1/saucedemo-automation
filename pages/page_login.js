import { By } from "selenium-webdriver";

class PageLogin {
  static inputUsername = By.css('[data-test="username"]');
  static inputPassword = By.xpath('//*[@data-test="password"]');
  static buttonLogin = By.className('submit-button');
}

export default PageLogin;