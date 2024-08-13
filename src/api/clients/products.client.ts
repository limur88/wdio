import { apiConfig } from '../../config/apiConfig.js';
import type { IRequestOptions } from '../../data/types/api.types.js';
import { IProduct, IProductResponse } from '../../data/types/product.types.js';
import { AxiosApiClient } from '../../utils/axios.js';

export class ProductsApiClient {
  constructor(private apiClient = new AxiosApiClient()) {}

  async create(product: IProduct, token: string) {
    const options: IRequestOptions = {
      method: 'post',
      baseURL: apiConfig.baseUrl,
      url: apiConfig.endpoints.Products,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
      data: product,
    };
    return this.apiClient.send<IProductResponse>(options);
  }
}
