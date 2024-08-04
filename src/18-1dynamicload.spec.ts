// Task 1.

// Разработать тест со следующими шагами:

//   - открыть https://the-internet.herokuapp.com/
//   - перейти на страницу Dynamic Loading
//   - Дождаться появления каждой ссылки на странице (их 2)
//   - кликнуть по ссылке Example 1: Element on page that is hidden
//   - дождаться появления кнопки start
//   - кликнуть по кнопке start
//   - дождаться появления текста "Hello World!" в теге h4 с помощью метода waitForElementWithText(), который вам надо разработать!:)

//  Создать функцию waitForElementWithText(selector, text, timeout) для ожидания определенного текста (text) 
//  у элемента с определенным селектором (selector) на протяжении определенного времени (timeout):
//   - Использовать browser.waitUntil с комбинацией проверок (элемент виден и тест верный)
//   - Добавить понятный timeoutMsg, с пояснением какие проверки не пройдены и селектором элемента

describe("Dynamic loading", () =>{
    const task1Url = 'https://the-internet.herokuapp.com/';
    const dynamicLoadingLink = '//*[@href="/dynamic_loading"]';
    const linksXpath = '//a[contains(text(), "Example")]';
    const link1Xpath = '//a[contains(text(), "Example 1")]';
    const link2Xpath = '//a[contains(text(), "Example 2")]';


    before (async () => {
        await browser.maximizeWindow();
        await browser.pause(2000);
    });
    
    beforeEach( async () => {
    await browser.url(task1Url);
    await $(dynamicLoadingLink).click();
    await $(linksXpath).waitForDisplayed();
    });
  
    it('Should display text "Hello world!" after loading', async () => {
        const link1 = link1Xpath;
        await $(link1).click();
        const header1 = await $('h4');
        await expect(header1).toHaveText("Example 1: Element on page that is hidden");
        await $('button').click();
        await waitForElementWithText('#finish', 'Hello World!', 10000);
    });
  
    it('Should fail: click on example 2, intentionally wrong tet check', async () => {
        const link2 = link2Xpath;
        await $(link2).click();
        const header2 = await $('h4');
        await expect(header2).toHaveText("Example 2: Element rendered after the fact");
        await $('button').click();
        await waitForElementWithText('#finish', 'Hello Woooorld!', 1000);
    });
  });

    async function waitForElementWithText(selector: string, text:string, time:number){
       await browser.waitUntil(
        async() =>{
            const element = await $(selector);
            const displayed = await element.isDisplayed();
            const textPresence = await element.getText();
            return (displayed && textPresence === text);
        },
        {
            timeout: time,
            timeoutMsg: `The element with text ${text} was not displayed and did not have expected text after ${time} ms waiting`
        }
       );
    }
