import { loginCredentials } from '../../data/credentials/validLoginCreds.js';
import LoginPage from '../pages/login.page.js';
import { LogInService } from '../services/logIn.service.js';
import HomePage from '../pages/home.page.js';

describe('login new', () => {
  const link = 'https://anatoly-karpovich.github.io/aqa-course-project/#';
  const imageSelector = '//img[@class="img-fluid"]';

  before(async () => {
    await browser.maximizeWindow();
    await browser.pause(2000);
  });

  beforeEach(async () => {
    await browser.url(link);
    await $(imageSelector).isDisplayed();
  });

  it('Should login with valid credentials', async () => {
    await LoginPage.fillCredentials(loginCredentials);
    await LoginPage.clickOnLoginButton();
    await HomePage.verifyUser();
  });

  it('Should login with valid Admin credentials', async () => {
    const login = new LogInService();
    login.loginAsAdmin();
  });
});
