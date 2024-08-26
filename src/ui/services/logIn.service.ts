import { logStep } from '../../utils/report/decorator.js';
import HomePage from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';

export class LogInService {
  constructor(private loginPage = new LoginPage()) {}

  @logStep('Open Sales portal')
  async openSalesPortal() {
    await this.loginPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
  }
  @logStep('Login')
  async login() {
    await this.loginPage.fillCredentials();
    await this.loginPage.clickOnLoginButton();
    await this.loginPage.hiddenSpinner();
    await HomePage.waitForOpened();
  }
  @logStep('Login As Admin')
  async loginAsAdmin() {
    await this.login();
  }
  @logStep('Sign out')
  async signOut() {
    await this.loginPage.deleteCookies(['Authorization']);
  }
}
