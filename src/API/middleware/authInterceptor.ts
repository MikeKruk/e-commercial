import { InternalAxiosRequestConfig } from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import { LSTokens } from '../../constants/constants';

const authInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const configer = config;
  if (configer) {
    configer.headers = configer.headers || {};

    const accessToken = Cookies.get(LSTokens.ACCESS_TOKEN);
    const anonymousToken = Cookies.get(LSTokens.ANONYMOUS_TOKEN);
    if (accessToken) {
      configer.headers.Authorization = `Bearer ${accessToken}`;
    } else if (anonymousToken) {
      configer.headers.Authorization = `Bearer ${anonymousToken}`;
    }
  }

  return configer;
};

export default authInterceptor;
