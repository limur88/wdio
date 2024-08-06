// Разработать метод для выбора элемента в дропдауте "клавиатурой":
//   selectDropdownValueWithKeys(dropdownSelector: string, optionsSelector: string, value: string)
//   со следующими шагами:
//     - кликнуть на дропдаун
//     - дождаться появления элементов дропдауна на экране
//     - Найти сколько раз надо нажать "вниз"
//     - столько раз нажать стрелку ВНИЗ на клавиатуре, чтобы добраться до нужного элемента
//     - нажать кнопку "Enter" на клавиатуре

// Проверьте работу метода тут:
// https://the-internet.herokuapp.com/
// станица Dropdown

//     Рекоммендации:
//       - import { Key } from 'webdriverio'
//       - Сверху импорт "ключей", в них есть и ArrowDown и Enter
//       - browser.keys() для отправки "кликов" по клавиатуре
describe('KeybordDropdown', () => {
  before(async () => {
    await browser.maximizeWindow();
    await browser.pause(4000);
  });
});
