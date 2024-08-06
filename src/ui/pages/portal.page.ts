import { BasePage } from './base.page.js';

export class PortalPage extends BasePage {
  protected readonly spinner = '//div[@class="spinner-border"]';

  async hiddenSpinner() {
    await this.waitForElement(this.spinner, 10000, true);
  }
}
