const TIMEOUT_5_SEC = 5000;

export abstract class BasePage {
  async findElement(locator: string) {
    return await $(locator);
  }

  async waitForElement(locator: string, timeout = TIMEOUT_5_SEC, reverse = false) {
    const element = await this.findElement(locator);
    await element.waitForDisplayed({ timeout, reverse });
    return element;
  }

  async click(locator: string, timeout = TIMEOUT_5_SEC) {
    const element = await this.waitForElement(locator, timeout);
    await element.click();
  }

  async setValue(locator: string, value: string | number, timeout = TIMEOUT_5_SEC) {
    const element = await this.waitForElement(locator, timeout);
    await element.setValue(value);
  }

  async getText(locator: string, timeout = TIMEOUT_5_SEC) {
    const element = await this.waitForElement(locator, timeout);
    return await element.getText();
  }

  async selectDropdownValue(locator: string, value: string | number, timeout = TIMEOUT_5_SEC) {
    const element = await this.waitForElement(locator, timeout);
    await element.selectByVisibleText(value);
  }

  async openPage(url: string) {
    await browser.url(url);
  }

  async deleteCookies(cookieNames: string[]) {
    await browser.deleteCookies(cookieNames);
  }
}
