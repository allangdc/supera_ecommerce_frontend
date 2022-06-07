import { AxiosError, AxiosResponse } from "axios";
import api from "./httpService";

export interface IUserInfo {
  username: string;
  date_joined: Date;
}

const USERINFO_URL = "/v1/user-info/";

class UserService {
  getUser = async (): Promise<AxiosResponse<Array<IUserInfo>> | undefined> => {
    try {
      const res = await api.get(USERINFO_URL);
      return res;
    } catch (e) {
      const err = e as AxiosError<Array<IUserInfo>>;
      console.log(e);
      return err.response;
    }
  };
}

export default new UserService();
