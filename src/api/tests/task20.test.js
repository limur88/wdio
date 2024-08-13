// - Написать класс signInApiClient:
//   -- В конструкторе получить AxiosApiClient
//   -- создать метод login(credentials: ICredentials) {
//       //implement
//       //использовать клиент полученный в конструкторе
//     }


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
import axios from "axios";

const baseUrl = 'https://aqa-course-project.app/';
  const endpoints = {
    login: '/api/login/',
    product: '/api/products/',
  };

export class SignInAxiosClient {
  
  constructor(baseUrl, endpoint){
    this.baseUrl = baseUrl;
    this.endpoint= endpoint;
    this.link = baseUrl + endpoint;
  }

  async login(credentials) {
    const response = await axios.post(this.link, credentials);
    let token = 'Bearer ' + response.data.token;
    return token;
 };
}



const credentials = {
  username: 'aqacourse@gmail.com',
  password: 'password',
};
 const logIn = new SignInAxiosClient(baseUrl, endpoints.login);
// logIn.login(credentials);
// console.log(await logIn.login(credentials));
const tokennn = await logIn.login(credentials);
console.log(tokennn)

// const a = await fetch('https://anatoly-karpovich.github.io/aqa-course-project/#');
// console.log(a.headers);
// console.log(a);