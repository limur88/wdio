// - Написать класс signInApiClient:
//   -- В конструкторе получить AxiosApiClient
//   -- создать метод login(credentials: ICredentials) {
//       //implement
//       //использовать клиент полученный в конструкторе
//     }

import { adminCredentials } from '../../data/credentials/adminCreds.js';
import { ICredentials } from '../../data/credentials/validLoginCreds.js';

// - Использовать его в Product smoke test в файле src/api/tests/products/smoke.test.ts
// 1.
// - Написать смоук тест сьют для эндпоинта продуктов с 5 тестами:
//   -- Создать продукт
//   -- Получить продукт по айди
//   -- Получить все продукты
//   -- Изменить продукт
//   -- Удалить продукт

// - Проверять статус код, IsSuccess, ErrorMessage
// - Токен для запросов брать из респонса login запроса в before hook

// 2.
//   Написать JSON схему для getAllProducts респонса (приходит массив продуктов)
//   Использовать ее в тесте на получение всех продуктов

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

// const credentials = {
//   username: 'aqacourse@gmail.com',
//   password: 'password',
// };
// const logIn = new SignInApiClient();
// logIn.login(credentials);
// console.log(logIn.login(credentials));
// const a = await fetch('https://anatoly-karpovich.github.io/aqa-course-project/#');
// console.log(a.headers);
// console.log(a);
