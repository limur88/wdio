import { IProduct } from '../../../data/types/product.types.js';
import { PortalPage } from '../portal.page.js';

export class AddNewProductPage extends PortalPage {
  readonly uniqueElement = '//h2[.="Add New Product "]';

  private readonly 'Name input' = '#inputName';
  private readonly 'Manufacturer dropdown' = 'select#inputManufacturer';
  private readonly 'Price input' = '#inputPrice';
  private readonly 'Amount input' = '#inputAmount';
  private readonly 'Notes textarea' = '#textareaNotes';
  private readonly 'Save New Product button' = '#save-new-product';
  private readonly 'Name Notification' = '#error-inputName';
  private readonly 'Price Notification' = '#error-inputPrice';
  private readonly 'Amount Notification' = '#error-inputAmount';
  private readonly 'Notes Notification' = '#error-textareaNotes';

  async fillInputs(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsValidMinValues(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name.slice(0, 3)));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    await this.setValue(this['Price input'], 1);
    await this.setValue(this['Amount input'], 0);
  }

  async fillInputsValidMaxValues(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name.slice(0, 12) + Date.now() + Date.now()));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    await this.setValue(this['Price input'], 99999);
    await this.setValue(this['Amount input'], 999);
    await this.setValue(
      this['Notes textarea'],
      'Обязательное НЕобязательное Разрешенные символы:1. Любые символы, krome:2. Длина: 0-250 Выбор одного значения из:●	Apple●	Samsung●	Google●	Microsoft●	Sony●	XiaomiAmazonTeslaСтили компонента описаны в разделе “Add New Product Components” документа “Components”',
    );
  }

  async fillInputsShortName(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name.slice(0, 1)));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsLongName(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name + 'soo many symbols - qwertyuiopasdfghjklzx'));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputs2SpacesName(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name + 't  o o many spaces'));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsZeroPrice(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    await this.setValue(this['Price input'], 0);
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsOverPrice(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    await this.setValue(this['Price input'], 1000000);
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsLettersPrice(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    await this.setValue(this['Price input'], 'hundred');
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsInavlidNotes(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes + '<A>'));
  }

  async fillInputs260Notes(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes.repeat(26)));
  }

  async fillInputsLetterAmount(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    product.amount !== undefined && (await this.setValue(this['Amount input'], product.amount + 'l'));
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsBigAmount(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    await this.setValue(this['Amount input'], 10000);
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async fillInputsDecimalAmount(product: Partial<IProduct>) {
    product.name && (await this.setValue(this['Name input'], product.name));
    product.manufacturer && (await this.selectDropdownValue(this['Manufacturer dropdown'], product.manufacturer));
    product.price !== undefined && (await this.setValue(this['Price input'], product.price));
    await this.setValue(this['Amount input'], 5 / 2);
    product.notes && (await this.setValue(this['Notes textarea'], product.notes));
  }

  async verifyNameErrorMessage() {
    await $(this['Name Notification']).waitForDisplayed();
  }

  async verifyPriceErrorMessage() {
    await $(this['Price Notification']).waitForDisplayed();
  }

  async verifyAmountErrorMessage() {
    await $(this['Amount Notification']).waitForDisplayed();
  }

  async verifyNotesErrorMessage() {
    await $(this['Notes Notification']).waitForDisplayed();
  }

  async verifyErrorMessage(field: 'Notes' | 'Name' | 'Price' | 'Amount') {
    await $(this[`${field} Notification`]).waitForDisplayed();
  }

  async savebuttonDisabled() {
    const saveButton = await $(this['Save New Product button']);
    expect(await saveButton.isEnabled()).toBe(false);
  }

  async clickOnSaveButton() {
    await this.click(this['Save New Product button']);
  }
}
