//import { useUserStore } from 'store';
import axios, { Method, CancelToken } from 'axios';
import constants from '../../constants';

const { API_URL } = constants;

type Params = {
  id?: number;
  page?: number;
  limit?: number;
};
type Options = {
  method?: Method;
  url: string;
  headers?: {};
  data?: {};
  cancelToken?: CancelToken;
};

const unAuthRequest = (options: Options, params?: Params) => {
  return axios({
    ...options,
    method: options.method || 'get',
    baseURL: API_URL,
    params: {
      ...params,
    },
  });
};

export { unAuthRequest };
