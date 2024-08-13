import _ from 'lodash';
import { generateNewProduct } from '../../../data/products/generateProduct.js';
import { IProduct } from '../../../data/types/product.types.js';
import { adminCredentials } from '../../../data/credentials/adminCreds.js';
import { SignInAxiosClient } from '../../clients/signInAxiosClient.js';
import { STATUS_CODES } from '../../../data/types/api.types.js';
import { apiConfig } from '../../../config/apiConfig.js';
import axios from 'axios';
// import { ICredentials } from '../../../data/credentials/validLoginCreds.js';

describe('[API] [Products] Smoke', () => {
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
    const logIn = new SignInAxiosClient(apiConfig.baseUrl, apiConfig.endpoints.Login);
    token = await logIn.login(credentials);

    //     let auth = {
    //         headers: {
    //           Authorization: token,
    //           'Content-Type': 'application/json',
    //         },
    // }
  });

  // afterEach(async () => {
  //   if (createdProduct) {
  //     const id = createdProduct.Product._id;
  //     const response = await axios.delete(apiConfig.baseUrl + apiConfig.endpoints.Products + id + '/', {
  //       headers: {
  //         Authorization: token,
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     expect(response.status).toBe(STATUS_CODES.DELETED);
  //   } else {
  //     console.log('Nothing to delete');
  //     axios.get('https://anatoly-karpovich.github.io/aqa-course-project/');
  //   }
  // });

  it('Should create product', async () => {
    const productData = generateNewProduct();
    const response = await axios.post(apiConfig.baseUrl + apiConfig.endpoints.Products, productData, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    expect(response.status).toBe(STATUS_CODES.CREATED);
    createdProduct = response.data;
    console.log(createdProduct);

    const actualProduct = _.omit(createdProduct.Product, ['_id', 'createdOn']);
    expect(createdProduct.ErrorMessage).toBe(null);
    expect(createdProduct.IsSuccess).toBe(true);
    expect(actualProduct).toMatchObject({ ...productData });
  });

  it('Should create product and delete the product', async () => {
    const productData = generateNewProduct();
    const response = await axios.post(apiConfig.baseUrl + apiConfig.endpoints.Products, productData, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    expect(response.status).toBe(STATUS_CODES.CREATED);
    createdProduct = response.data;

    const actualProduct = _.omit(createdProduct.Product, ['_id', 'createdOn']);

    expect(createdProduct.ErrorMessage).toBe(null);
    expect(createdProduct.IsSuccess).toBe(true);
    expect(actualProduct).toMatchObject({ ...productData });

    const id = createdProduct.Product._id;
    const deleteProduct = await axios.delete(apiConfig.baseUrl + apiConfig.endpoints.Products + id + '/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    expect(deleteProduct.status).toBe(STATUS_CODES.DELETED);
  });

  it('Should return list of products', async () => {
    const response = await axios.get(apiConfig.baseUrl + apiConfig.endpoints.Products, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const productList = response.data;

    expect(response.status).toBe(STATUS_CODES.OK);
    expect(productList.ErrorMessage).toBe(null);
    expect(productList.IsSuccess).toBe(true);
  });

  it('Should return list of products and delete latest product', async () => {
    const response = await axios.get(apiConfig.baseUrl + apiConfig.endpoints.Products, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const productList = response.data;
    const id = productList.Products[0]._id;

    const deleteProduct = await axios.delete(apiConfig.baseUrl + apiConfig.endpoints.Products + id + '/', {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    expect(deleteProduct.status).toBe(STATUS_CODES.DELETED);
  });

  it.only('Should return list of products and update latest product', async () => {
    const response = await axios.get(apiConfig.baseUrl + apiConfig.endpoints.Products, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });
    const productList = response.data;
    const id = productList.Products[0]._id;

    const updateProductData = {
      _id: id,
      ...generateNewProduct(),
    };

    const updateProduct = await axios.put(apiConfig.baseUrl + apiConfig.endpoints.Products, updateProductData, {
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    expect(updateProduct.status).toBe(STATUS_CODES.OK);
    expect(updateProduct.data.IsSuccess).toBe(true);
    expect(updateProduct.data.ErrorMessage).toBe(null);
  });
});
