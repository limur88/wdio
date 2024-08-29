import { LoginPage } from '../pages/login.page.js';
import { LogInService } from '../services/logIn.service.js';
import HomePage from '../pages/home.page.js';

describe('login new', () => {
  const link = 'https://anatoly-karpovich.github.io/aqa-course-project/#';
  const imageSelector = '//img[@class="img-fluid"]';
  const login = new LoginPage();
  beforeEach(async () => {
    await browser.url(link);
    await $(imageSelector).isDisplayed();
  });

  it('Should login with valid credentials', async () => {
    await login.fillCredentials();
    await login.clickOnLoginButton();
    await HomePage.verifyUser();
  });

  it('Should login with valid Admin credentials', async () => {
    const login = new LogInService();
    login.loginAsAdmin();
  });
});
