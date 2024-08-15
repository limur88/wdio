import { IUserCredentials } from '../../data/types/user.types.js';
import { PortalPage } from './portal.page.js';

export class LoginPage extends PortalPage {
  uniqueElement = '//form[.//input[@id="emailinput"]]';

  protected readonly 'Email Field' = '#emailinput';
  protected readonly 'Password field' = '#passwordinput';
  protected readonly 'Login Button' = '//button[@type="submit"]';

  async fillCredentials(credentials: IUserCredentials) {
    await $(this['Email Field']).setValue(credentials.username);
    await $(this['Password field']).setValue(credentials.password);
    return this;
  }

  async clickOnLoginButton() {
    await $(this['Login Button']).click();
    this.hiddenSpinner();
  }
}
export default new LoginPage();
