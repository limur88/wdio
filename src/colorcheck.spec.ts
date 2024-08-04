// Task 2.
// Разработать тест со следующими шагами:
//  - Открыть url https://anatoly-karpovich.github.io/aqa-course-project/#
//  - Войти в приложения используя учетные данные aqacourse@gmail.com / password при этом:
//  - проверить исчезновение спиннера с помощью waitFor* методов
//  - проверить действительно ли пользователь с логином AQA User вошел в систему
//  - Прокликать каждый элемент бокового меню, убедится что после клика background-color элемента не красный

//  Рекомендации по использованию:
//  - метод $$ поиска по всем элементам
//  - for .. of  для перебора коллекции элементов
//  - метод click() для клика по элементу в цикле
//  - Проверить background-color можно двумя способами:
//     1. По CSS стилю.  element.getCSSProperty('background-color)  https://webdriver.io/docs/api/element/getCSSProperty
//     2. По отсутствию класса, отвечающего за добавление красного бэкграунда.  element.getAttribute('class') https://webdriver.io/docs/api/element/getAttribute

// to catch spinner, write in console setTimeout(function(){debugger;}, 1000);

describe('Background color check', () => {
  const link = 'https://anatoly-karpovich.github.io/aqa-course-project/#';
  const emailFieldSelector = '#emailinput';
  const imageSelector = '//img[@class="img-fluid"]';
  const passwordFieldSelector = '#passwordinput';
  const loginButtonSelector = '//button[@type="submit"]';
  const spinnerSelector = '//div[@class="spinner-border"]';
  const validCredentials = {
    username: 'aqacourse@gmail.com',
    password: 'password',
  };
  const sidemenu = '.nav-link';

  before(async () => {
    await browser.maximizeWindow();
    await browser.pause(2000);
  });

  beforeEach(async () => {
    await browser.url(link);
    await $(imageSelector).isDisplayed();
    const email = await $(emailFieldSelector);
    await email.setValue(validCredentials.username);
    const password = await $(passwordFieldSelector);
    await password.setValue(validCredentials.password);
    await $(loginButtonSelector).click();
    await $(spinnerSelector).waitForDisplayed({ reverse: true });
    const username = await $('strong');
    expect(username).toHaveText('AQA User');
  });

  it('Should click on each sidebar Menu element to check background color', async () => {
    for await (const sidemenulink of $$(sidemenu)) {
      await sidemenulink.click();
      await $(spinnerSelector).waitForDisplayed({ reverse: true });
      const color = await sidemenulink.getCSSProperty('background-color');
      expect(color.value).not.toEqual('rgba(220,53,69,1)');
    }
  });
});
