import { PortalPage } from './portal.page.js';

export class LoginPage extends PortalPage {
  protected readonly 'Email Field' = '#emailinput';
  protected readonly 'Password field' = '#passwordinput';
  protected readonly 'Login Button' = '//button[@type="submit"]';
  protected readonly 'Spinner' = '//div[@class="spinner-border"]';
  protected readonly 'Loged User Name' = 'strong';

  async fillCredentials(credentials: { [key: string]: string }) {
    await $(this['Email Field']).setValue(credentials.username);
    await $(this['Password field']).setValue(credentials.password);
    return this;
  }

  async clickOnLoginButton() {
    await $(this['Login Button']).click();
    this.hiddenSpinner();
  }

  async verifyUser() {
    expect(this['Loged User Name']).toHaveText('AQA User');
  }
}
export default new LoginPage();
