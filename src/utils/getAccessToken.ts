import Cookies from 'js-cookie';

const getAccessToken = (): string | undefined => {
  return Cookies.get('access_token');
};

export default getAccessToken;
