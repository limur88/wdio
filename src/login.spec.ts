describe( 'Login', () =>{
const siteUrl = 'https://anatoly-karpovich.github.io/demo-login-form/';
const submitButtonXpath = '//input[@id="submit"]';
const usernameFieldLogin = '//input[@id="userName"]';
const passwordFieldLogin = '//input[@id="password"]';
const loginPageName = '#loginForm';
const loginPageHeader = 'Login';
const loggedMessageXpath = '//*[@id="successMessage"]';
const errorMessageXpath = '//h4[@id="errorMessage"]';
const errorMessageText = 'Invalid credentials';

before (async () => {
    await browser.maximizeWindow();
});

beforeEach( async () => {
    await browser.url(siteUrl); 
    const loginPage = await $(loginPageName);
    expect(loginPage).toHaveText(loginPageHeader);
});

context ('Positive scenario', () =>{
    const validCredentials = {
        userName: 'student',
        password: 'strongPass'
    };

  it('Registered user can login with valid credentials', async () => {
    const username = await $(usernameFieldLogin);
    const password = await $(passwordFieldLogin);
    const submitButton = await $(submitButtonXpath);
    const successLoginText = `Hello, ${validCredentials.userName} `

    await username.setValue(validCredentials.userName);
    await password.setValue(validCredentials.password);
    await submitButton.click();
    
    expect(loggedMessageXpath).toHaveText(successLoginText);
   
  });

  context ('Negative scenario', () =>{
    const inValidCredentials = {
        userName: 'student',
        password: 'strongass'
    };

  it('User can NOT login with INvalid credentials', async () => {
    const username = await $(usernameFieldLogin);
    const password = await $(passwordFieldLogin);
    const submitButton = await $(submitButtonXpath);

    await username.setValue(inValidCredentials.userName);
    await password.setValue(inValidCredentials.password);
    await submitButton.click();
    
    expect(errorMessageXpath).toHaveText(errorMessageText);
   
  });
});
});
})
