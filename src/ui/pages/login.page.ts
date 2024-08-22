import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment.js';
import { PortalPage } from './portal.page.js';

export class LoginPage extends PortalPage {
  uniqueElement = '//form[.//input[@id="emailinput"]]';

  protected readonly 'Email Field' = '#emailinput';
  protected readonly 'Password field' = '#passwordinput';
  protected readonly 'Login Button' = '//button[@type="submit"]';

  async fillCredentials() {
    await $(this['Email Field']).setValue(ADMIN_USERNAME);
    await $(this['Password field']).setValue(ADMIN_PASSWORD);
    return this;
  }

  async clickOnLoginButton() {
    await $(this['Login Button']).click();
    this.hiddenSpinner();
  }
}
// export default new LoginPage();
