import { ADMIN_PASSWORD, ADMIN_USERNAME } from '../../config/environment';

export const loginCredentials = {
  username: ADMIN_USERNAME,
  password: ADMIN_PASSWORD,
};
export interface ICredentials {
  username: string;
  password: string;
}
