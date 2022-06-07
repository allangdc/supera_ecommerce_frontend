import { AxiosError, AxiosResponse } from "axios";
import http, {
  apiLogin,
  clearTokens,
  getLocalRefreshToken,
  setLocalAccessToken,
  setLocalRefreshToken,
} from "./httpService";

const ACCESS_TOKEN_URL = "/v1/login/";
const LOGOUT_URL = "/v1/logout/";

export interface IAuthData {
  access: string;
  refresh: string;
}

class AuthService {
  async login(
    user: string,
    password: string
  ): Promise<AxiosResponse<any> | undefined> {
    try {
      const res = await apiLogin.post(ACCESS_TOKEN_URL, {
        username: user,
        password,
      });
      setLocalAccessToken(res.data.access);
      setLocalRefreshToken(res.data.refresh);
      return res;
    } catch (e) {
      const err = e as AxiosError;
      console.log(e);
      return err.response;
    }
  }

  async logout(): Promise<boolean> {
    try {
      const res = await http.post(LOGOUT_URL, {
        refresh: getLocalRefreshToken(),
      });
      clearTokens();
      return true;
    } catch (e) {
      console.log(e);
    }
    return false;
  }
}

export default new AuthService();
