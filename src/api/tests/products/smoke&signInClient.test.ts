import _ from 'lodash';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct } from '../../../data/types/product.types.js';
import { adminCredentials } from '../../../data/credentials/adminCreds.js';
import { SignInApiClient } from '../../clients/signInApiClient.js';
// import { ICredentials } from '../../../data/credentials/validLoginCreds.js';

describe('[API] [Products] Smoke', () => {
  const baseUrl = 'https://aqa-course-project.app/';
  const endpoints = {
    login: '/api/login/',
    product: '/api/products/',
  };
  let token = '';
  const credentials = {
    username: adminCredentials.username,
    password: adminCredentials.password,
  };

  let createdProduct: {
    Product: IProduct & { _id: string; createdOn: string };
    IsSuccess: boolean;
    ErrorMessage: string | null;
  };

  beforeEach(async () => {
    const logIn = new SignInApiClient(baseUrl, endpoints.login);
    token = await logIn.login(credentials);
    console.log(token);
  });

  afterEach(async () => {
    if (createdProduct) {
      const id = createdProduct.Product._id;
      const response = await fetch(baseUrl + endpoints.product + id + '/', {
        method: 'delete',
        headers: {
          Authorization: token,
          'Content-Type': 'application/json',
        },
      });
      expect(response.status).toBe(204);
    }
  });

  it('Should create product', async () => {
    console.log(token);
    const productData = generateNewProduct();
    const response = await fetch(baseUrl + endpoints.product, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(productData),
    });
    expect(response.status).toBe(201);
    createdProduct = await response.json();
    console.log(createdProduct);

    const actualProduct = _.omit(createdProduct.Product, ['_id', 'createdOn']);
    expect(createdProduct.ErrorMessage).toBe(null);
    expect(createdProduct.IsSuccess).toBe(true);
    expect(actualProduct).toMatchObject({ ...productData });
  });
});
