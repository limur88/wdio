import { IUserCredentials } from '../../data/types/user.types.js';
import HomePage from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';

export class LogInService {
  constructor(private loginPage = new LoginPage()) {}

  async openSalesPortal() {
    await this.loginPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
  }
  // async login(credentials: IUserCredentials) {
  async login() {
    await this.loginPage.fillCredentials();
    await this.loginPage.clickOnLoginButton();
    await this.loginPage.hiddenSpinner();
    await HomePage.waitForOpened();
  }

  async loginAsAdmin() {
    await this.login();
  }

  async signOut() {
    await this.loginPage.deleteCookies(['Authorization']);
  }
}
