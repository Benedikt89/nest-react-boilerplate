import axios, {AxiosResponse} from "axios";

import { ProfileFieldType, AuthToFrontUserData, AuthUserData, LoginData } from '../../types/auth-types';

export interface RecoverPasswordData {
  old_pass: string,
  password: string,
  repeat_password: string
}

const fakeRequest = (v = { data: {}}): Promise<{data: {}}> => {
  return new Promise(resolve => setTimeout(resolve, Math.random() * 100, v))
}

export const authAPI = {
  async loginUser(data: LoginData): Promise<AuthToFrontUserData | never | any> {
    const res = await fakeRequest();
    return res.data;
  },
  async getUser(auth: string) {
    await fakeRequest();
    return {
      Authorization: "asd",
      Expiration: "string",
      login: "string",
      role: 'ROLE_ADMIN',
      userId: "string",
    } as AuthUserData;
  },
  async getUserFields(auth: string): Promise<never | ProfileFieldType[]> {
    const res: AxiosResponse = await axios('asd/asdw');
    return res.data.res || [];
  },
  async updateUserFields(auth: string, data: ProfileFieldType[]): Promise<never | boolean> {
    const res: AxiosResponse = await axios('asd/asdw');
    return res.data.res || false;
  },
  async recoverPassword(auth: string, data: RecoverPasswordData) {
    const res: AxiosResponse = await axios('asd/asdw');
    return res.data.res
  },
};
