import { adminCredentials } from '../../data/types/adminCreds.js';
import { loginCredentials } from '../../data/types/validLoginCreds.js';
import { LoginPage } from '../pages/login.page.js';

export class PageService {
  constructor(private loginPage = new LoginPage()) {}

  async login() {
    await (await this.loginPage.fillCredentials(loginCredentials)).clickOnLoginButton();
  }

  async loginAsAdmin() {
    await (await this.loginPage.fillCredentials(adminCredentials)).clickOnLoginButton();
  }
}
//   - login() (fillCredentials, click on login button, wait for spinner to hide)
//   - loginAsAdmin(), который логинит используя учетные данные aqacourse@gmail.com / password
