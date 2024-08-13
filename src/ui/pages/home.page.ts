import { PortalPage } from './portal.page.js';

class HomePage extends PortalPage {
  //   uniqueElement = '//strong[.="AQA User"]';
  uniqueElement = 'strong';

  readonly 'Orders button' = "//button[@id='orders-from-home']";
  readonly 'Products button' = "//button[@id='products-from-home']";
  readonly 'Customers button' = "//button[@id='customers-from-home']";

  async openOrders() {
    await $(this['Orders button']).click();
  }

  async openProducts() {
    await $(this['Products button']).click();
  }

  async openCustomers() {
    (await $(this['Customers button'])).click();
  }

  async clickOnViewDetailsbutton(moduleName: 'Products' | 'Customers' | 'Orders') {
    await this.click(this[`${moduleName} button`]);
  }

  async verifyUser() {
    expect(this.uniqueElement).toHaveText('AQA User');
  }
}

export default new HomePage();
