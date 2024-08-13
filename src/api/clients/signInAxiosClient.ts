import axios from 'axios';
import { ICredentials } from '../../data/credentials/validLoginCreds.js';
import { STATUS_CODES } from '../../data/types/api.types.js';

export class SignInAxiosClient {
  readonly baseUrl: string;
  readonly endpoint: string;
  link: string;

  constructor(baseUrl: string, endpoint: string) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
    this.link = baseUrl + endpoint;
  }

  async login(credentials: ICredentials) {
    const response = await axios.post(this.link, credentials);
    if (response.status !== STATUS_CODES.OK) {
      throw new Error('failed to login');
    }
    let token = 'Bearer ' + response.data.token;
    return token;
  }
}
