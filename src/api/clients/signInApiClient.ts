import { ICredentials } from '../../data/credentials/validLoginCreds.js';

export class SignInApiClient {
  baseUrl: string;
  endpoint: string;

  constructor(baseUrl: string, endpoint: string) {
    this.baseUrl = baseUrl;
    this.endpoint = endpoint;
  }

  async login(credentials: ICredentials) {
    const response = await fetch(this.baseUrl + this.endpoint, {
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });

    if (response.ok) {
      let token = 'Bearer ' + (await response.json()).token;
      return token;
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
