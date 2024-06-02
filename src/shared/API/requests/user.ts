import { CustomerDraft, MethodType } from '@commercetools/platform-sdk';
import { ctpClient, authClient } from '../BuildClient';


import LSTokens from '../../../constants/constants';
import ROUTES from '../../../utils/routes';

const { PROJECT_KEY } = process.env;

async function getAccessToken() {
  try {
    const tokenResponse = await authClient.clientCredentialsFlow();
    return tokenResponse.access_token;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'error');
  }
}

async function createUser(userData: CustomerDraft) {
  try {
    const accessToken = await getAccessToken();
    const request = {
      uri: `/${PROJECT_KEY}/customers`,
      method: 'POST' as MethodType,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: userData,
    };
    const response = await ctpClient.execute(request);
    return response.body;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'error');
  }
}

async function loginUser(
  email: string,
  password: string,
  navigate: (path: string) => void,
) {
  try {
    const request = {
      uri: `/${PROJECT_KEY}/me/login`,
      method: 'POST' as MethodType,
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        email,
        password,
      },
    };
    const response = await ctpClient.execute(request);
    if (response.statusCode === 200) {
      navigate(ROUTES.MAIN_PAGE);
    }
    return response.body;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'error');
  }
}


async function getCustomerToken(
  username: string,
  password: string,
  navigate: (path: string) => void,
) {
  try {
    const tokenResponse = await authClient.customerPasswordFlow({
      username,
      password,
    });
    localStorage.setItem(LSTokens.ACCESS_TOKEN, tokenResponse.access_token);
    localStorage.setItem(LSTokens.REFRESH_TOKEN, tokenResponse.refresh_token);
    navigate(ROUTES.MAIN_PAGE);
    return tokenResponse.access_token;
  } catch (e) {
    throw new Error(e instanceof Error ? e.message : 'error');
  }
}

const user = {
  createUser,
  getCustomerToken,
  loginUser,
};

export default user;
