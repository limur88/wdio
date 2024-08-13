import { ProductsPage } from '../pages/products/products.page.js';
import HomePage from '../pages/home.page.js';

export class HomeService {
  constructor(private productsPage = new ProductsPage()) {}

  async openProductsPage() {
    await HomePage.clickOnViewDetailsbutton('Products');
    await HomePage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }

  async openCustomersPage() {
    await HomePage.clickOnViewDetailsbutton('Customers');
    await HomePage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }

  async openOrdersPage() {
    await HomePage.clickOnViewDetailsbutton('Orders');
    await HomePage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }
}
