import { adminCredentials } from '../../data/credentials/adminCreds.js';
import { IUserCredentials } from '../../data/types/user.types.js';
import HomePage from '../pages/home.page.js';
import { LoginPage } from '../pages/login.page.js';

export class LogInService {
  constructor(private loginPage = new LoginPage()) {}

  async openSalesPortal() {
    await this.loginPage.openPage('https://anatoly-karpovich.github.io/aqa-course-project');
  }

  async login(credentials: IUserCredentials) {
    await this.loginPage.fillCredentials(credentials);
    await this.loginPage.clickOnLoginButton();
    await this.loginPage.hiddenSpinner();
    await HomePage.waitForOpened();
  }

  async loginAsAdmin() {
    await this.login(adminCredentials);
  }

  async signOut() {
    await this.loginPage.deleteCookies(['Authorization']);
  }
}
//   - login() (fillCredentials, click on login button, wait for spinner to hide)
//   - loginAsAdmin(), который логинит используя учетные данные aqacourse@gmail.com / password
