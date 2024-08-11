// Реализовать business и core слои во фреймворке для логин функциональности:
// 1. Написать Page Object класс для страницы Sign In:
//   - email input
//   - password input
//   - login button
//   - fillCredentials method
//   - click on login button method
// 2. Написать PageService класс для SignIn, реализующий следующие методы:
//   - login() (fillCredentials, click on login button, wait for spinner to hide)
//   - loginAsAdmin(), который логинит используя учетные данные aqacourse@gmail.com / password

// 3. Сделать Core и Business классы для Home page
import { loginCredentials } from '../../data/types/validLoginCreds.js';
import LoginPage from '../pages/login.page.js';
import { PageService } from '../services/signIn.js';

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
    await LoginPage.verifyUser();
  });

  it('Should login with valid Admin credentials', async () => {
    const login = new PageService();
    login.loginAsAdmin();
  });
});
