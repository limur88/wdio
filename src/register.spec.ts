// - Установить WebdriverIO командой  npm init wdio@latest .
// - Создать файл для теста с названием register.spec.ts
// - Добавить во wdio.conf.ts путь к файлу с тестом в массив specs
// Разработайте тест со следующими шагами:
// 1. Открыть страницу https://anatoly-karpovich.github.io/demo-login-form/ используя browser.url()
// 2. Кликнуть по кнопке Register методом . click()
// 3. Ввести валидные username/password (требования ниже) методом setValue()
// 4. Кликнуть Register
// 5. Завалидировать, верную нотификацию о регистрации методом .toHaveText()
// Написать 2 тест сьюта:
// 1. Тесты на регистрацию
// 2. Тесты на логин

// Сайт тот же, что и в Таск 1
// Страница регистрации:
// Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
// Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

describe('Registration', () => {
    const siteUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';
    const registerButtonXpath = '//input[@id="registerOnLogin"]';
    const registrationPageName ='//h2[@id="registerForm"]';
    const usernameFieldRegistration = '//input[@id="userNameOnRegister"]';
    const passwordFieldRegistration = '//input[@id="passwordOnRegister"]';
    const registrationPageTitleText = 'Registration';
    const submitRegisterButtonXpath = '//input[@id = "register"]';
    const messageXpath ='//h4[@id="errorMessageOnRegister"]';
    const successText = 'Successfully registered! Please, click Back to return on login page';
    const failText ='Please, provide valid data';
    const backButton = '//input[@id = "backOnRegister"]';

    before (async () => {
        await browser.maximizeWindow();
    });

    beforeEach( async () => {
        await browser.url(siteUrl); 
        const registerButton = await $(registerButtonXpath);
        await registerButton.click();
        const registrationPageTitle = await $(registrationPageName);
        expect(registrationPageTitle).toHaveText(registrationPageTitleText);
    })

    context ('Positive scenario', () =>{
    const validCredentials = {
        userName: 'student',
        password: 'strongPass'
    };

  it('Should register with valid credentials', async () => {
    const username = await $(usernameFieldRegistration);
    const password = await $(passwordFieldRegistration);
    const submitRegisterButton = await $(submitRegisterButtonXpath);

    await username.setValue(validCredentials.userName);
    await password.setValue(validCredentials.password);
    await submitRegisterButton.click();
    
    expect(messageXpath).toHaveText(successText);
    const backButtonRegistration = await $(backButton);
    await backButtonRegistration.click();
    
  });
});
// Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
// Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

context ('Negative scenario', () =>{
  const invalidCredentials = {
      userName: ['AV', '', 'student'],
      password: ['strongPass', '', 'strongpass']
  };

it('Should NOT register with too short username', async () => {
  const username = await $(usernameFieldRegistration);
  const password = await $(passwordFieldRegistration);
  const submitRegisterButton = await $(submitRegisterButtonXpath);

  await username.setValue(invalidCredentials.userName[0]);
  await password.setValue(invalidCredentials.password[0]);
  await submitRegisterButton.click();
  
  expect(messageXpath).toHaveText(failText);  
});

it('Not registered witout data, verify fields are required to fill', async () => {
  const username = await $(usernameFieldRegistration);
  const password = await $(passwordFieldRegistration);
  const submitRegisterButton = await $(submitRegisterButtonXpath);

  await username.setValue(invalidCredentials.userName[1]);
  await password.setValue(invalidCredentials.password[1]);
  await submitRegisterButton.click();
  
  expect(messageXpath).toHaveText(failText);  
});

it('shoould nor register with password in lowerCase only', async () => {
  const username = await $(usernameFieldRegistration);
  const password = await $(passwordFieldRegistration);
  const submitRegisterButton = await $(submitRegisterButtonXpath);

  await username.setValue(invalidCredentials.userName[2]);
  await password.setValue(invalidCredentials.password[2]);
  await submitRegisterButton.click();
  
  expect(messageXpath).toHaveText(failText);  
});
});
})
