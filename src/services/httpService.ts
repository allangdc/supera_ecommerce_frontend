import axios from "axios";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";
const TKNAME = "Authorization"; // "x-access-token"

export const BASE_URL = "http://localhost:8000/api";
const REFRESH_TOKEN_URL = "/v1/refresh-token/";

export const getLocalAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN) || "void";
export const getLocalRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN) || "void";

export const setLocalAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token);
export const setLocalRefreshToken = (token: string) =>
  localStorage.setItem(REFRESH_TOKEN, token);

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const apiLogin = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    if (token && config.headers) {
      config.headers[TKNAME] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const refreshToken = async () => {
  return apiLogin.post(REFRESH_TOKEN_URL, {
    refresh: getLocalRefreshToken(),
  });
};

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = false;
        try {
          const rs = await refreshToken();
          const { access } = rs.data;
          setLocalAccessToken(access);
          api.defaults.headers.common[TKNAME] = access;
          return api(originalConfig);
        } catch (_error: any) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
