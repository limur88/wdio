import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct } from '../../../data/types/product.types.js';
import { logStep } from '../../../utils/report/decorator.js';
import { AddNewProductPage } from '../../pages/products/addNewProduct.page.js';
import { ProductsPage } from '../../pages/products/products.page.js';

export class AddProductService {
  constructor(
    private productsPage = new ProductsPage(),
    private addNewProductPage = new AddNewProductPage(),
  ) {}

  @logStep('Fill product inputs')
  async fillProductInputs(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs(product);
  }

  @logStep('Save new product')
  async save() {
    await this.addNewProductPage.clickOnSaveButton();
  }
  @logStep('Create product')
  async create(product?: IProduct) {
    await this.fillProductInputs(product ?? generateNewProduct());
    await this.save();
    await this.addNewProductPage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }

  @logStep('Create product with short info in all fields')
  async createShort(product?: IProduct) {
    await this.fillProductInputsValidMinValues(product ?? generateNewProduct());
    await this.save();
    await this.addNewProductPage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }

  @logStep('Create product with long info in all fields')
  async createLong(product?: IProduct) {
    await this.fillProductInputsValidMaxValues(product ?? generateNewProduct());
    await this.save();
    await this.addNewProductPage.hiddenSpinner();
    await this.productsPage.waitForOpened();
  }

  @logStep('Fill product inputs with valid shortest values')
  async fillProductInputsValidMinValues(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsValidMinValues(product);
  }

  @logStep('Fill product inputs with valid longest values')
  async fillProductInputsValidMaxValues(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsValidMaxValues(product);
  }

  @logStep('Fill product inputs with invalid short name')
  async fillProductInputsShortName(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsShortName(product);
  }

  @logStep('Fill product inputs- Name with 2 spaces; negative')
  async fillProductInputsSpacedName(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs2SpacesName(product);
  }

  @logStep('Fill product inputs - 0 price')
  async fillProductInputsZeroPrice(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsZeroPrice(product);
  }

  @logStep('Fill product inputs - too big price')
  async fillProductInputsHighPrice(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsOverPrice(product);
  }

  @logStep('Fill product inputs price with letters')
  async fillProductInputsLettersPrice(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsLettersPrice(product);
  }
  @logStep('Fill product inputs - invalid notes')
  async fillProductInputsInavlidNotes(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsInavlidNotes(product);
  }

  @logStep('Fill product inputs - too long notes')
  async fillProductInputsLongNotes(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputs260Notes(product);
  }

  @logStep('Fill product inputs -letters an amount')
  async fillProductInputsLetterAmount(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsLetterAmount(product);
  }

  @logStep('Fill product inputs - too big amount')
  async fillProductInputsBigAmount(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsBigAmount(product);
  }

  @logStep('Fill product inputs - decimall amount')
  async fillProductInputsDecimalAmount(product: Partial<IProduct>) {
    await this.addNewProductPage.fillInputsDecimalAmount(product);
  }

  @logStep('Verify notification is displayed')
  async verifyErrorMessage(field: 'Notes' | 'Name' | 'Price' | 'Amount') {
    await this.addNewProductPage.verifyErrorMessage(field);
    await this.addNewProductPage.savebuttonDisabled();
  }

  @logStep('Verify save button is disabled')
  async verifyBtnDisabled() {
    await this.addNewProductPage.savebuttonDisabled();
  }
}
// Добавьте возможность валидации формы создания продукта
//   - Добавить методы для валидации валидационных сообщений в AddNewProductService и AddNewProductPage
//   - Метод должен проверять наличие валидационной ошибки, ее текст, а также то, что кнопка Save New Product недоступна
// Написать валидационные автотесты по созданию продукта согласно требованиям.
// Позитивные:
//   - Напишите минимум 2 позитивных кейса (с минимумом и максимумов разрешенных символов в инпутах)
//   - В afterHook необходимо добавить шаги по удалению созданного продукта (нажать на карзину в таблице, удалить через модалку)

// Негативные:
//   - Негативные валидации по очереди для всех инпутов
//   - В каждом тесте необходимо проверить валидационное сообщение под проверяем инпутом
//   - В каждом тесте проверить, что Save New Product кнопка задизейблена
