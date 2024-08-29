import { generateNewProduct } from '../../data/products/generateProduct.js';
import { HomeService } from '../services/home.services.js';
import { LogInService } from '../services/logIn.service.js';
import { AddProductService } from '../services/products/addNewProduct.service.js';
import { ProductsListService } from '../services/products/products.service.js';
import allure from '@wdio/allure-reporter';

describe('[UI][Products] Negative', async () => {
  allure.addFeature('Product fields validation');
  allure.addSuite('[Products] Edit Fields validation, Negative');

  const signInService = new LogInService();
  const homeService = new HomeService();
  const addProductService = new AddProductService();
  const productService = new ProductsListService();
  const product = generateNewProduct();

  beforeEach(async () => {
    await signInService.openSalesPortal();
    await signInService.loginAsAdmin();
    await homeService.openProductsPage();
    await productService.openAddNewProductPage();
  });

  afterEach(async () => {
    await signInService.signOut();
  });

  it('Should create product with min data', async () => {
    allure.addStory('User attempts to create product with minimum info');
    allure.addSeverity('normal');
    await addProductService.createShort(product);
  });

  it('Should create product with max data', async () => {
    allure.addStory('User attempts to create product with max info');
    allure.addSeverity('normal');
    await addProductService.createLong(product);
  });

  it('Should display validation notification that product name is too short - 2 characters', async () => {
    allure.addStory('User attempts to create product with 2 char name');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsShortName(product);
    await addProductService.verifyErrorMessage('Name');
  });

  it('Should display validation notification when product name has 2 spaces between words', async () => {
    allure.addStory('User attempts to create product with 2 spaced between words');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsSpacedName(product);
    await addProductService.verifyErrorMessage('Name');
  });

  it('Should display validation notification when 0 for price', async () => {
    allure.addStory('User attempts to create product with 0 price');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsZeroPrice(product);
    await addProductService.verifyErrorMessage('Price');
  });

  it('Should display validation notification when invalid high price', async () => {
    allure.addStory('User attempts to create product with 100 000 price');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsHighPrice(product);
    // await browser.pause(5000);
    await addProductService.verifyErrorMessage('Price');
  });

  it('Should display validation notification when letters for price', async () => {
    allure.addStory('User attempts to create product with letters in price');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsLettersPrice(product);
    await addProductService.verifyErrorMessage('Price');
  });

  it('Should display validation notiication when notes have not allowed symbols', async () => {
    allure.addStory('User attempts to write note with < > symbols');
    allure.addSeverity('minor');
    await addProductService.fillProductInputsInavlidNotes(product);
    await addProductService.verifyErrorMessage('Notes');
  });

  it('Should display validation notiication when notes too long - 260 symbols', async () => {
    allure.addStory('User attempts to write too long notes: 260 symbols');
    allure.addSeverity('minor');
    await addProductService.fillProductInputsLongNotes(product);
    await addProductService.verifyErrorMessage('Notes');
  });

  it('Should display validation notiication when letters in amount', async () => {
    allure.addStory('User attempts to write letters into amount');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsLetterAmount(product);
    await addProductService.verifyErrorMessage('Amount');
  });

  it('Should display validation notiication when too big amount', async () => {
    allure.addStory('User attempts to write big amount');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsBigAmount(product);
    await addProductService.verifyErrorMessage('Amount');
  });

  it('Should display validation notiication when decimal amount', async () => {
    allure.addStory('User attempts to write decimals into amount');
    allure.addSeverity('normal');
    await addProductService.fillProductInputsDecimalAmount(product);
    await addProductService.verifyErrorMessage('Amount');
  });
});
