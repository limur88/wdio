import { ProductsPage } from '../pages/products/products.page.js';
import HomePage from '../pages/home.page.js';
import { logStep } from '../../utils/report/decorator.js';

export class HomeService {
  constructor(private productsPage = new ProductsPage()) {}

  @logStep('Open Product page')
  async openProductsPage() {
    await HomePage.clickOnViewDetailsbutton('Products');
    await HomePage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }

  @logStep('Open Customers page')
  async openCustomersPage() {
    await HomePage.clickOnViewDetailsbutton('Customers');
    await HomePage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }

  @logStep('Open Orders page')
  async openOrdersPage() {
    await HomePage.clickOnViewDetailsbutton('Orders');
    await HomePage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }
}
