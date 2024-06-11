import { createAsyncThunk } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-extraneous-dependencies
import Cookies from 'js-cookie';
import { CustomerDraft, MethodType } from '@commercetools/platform-sdk';
import { ctpClient, authClient } from '../BuildClient';

import ROUTES from '../../utils/routes';
import { notify } from '../../components/UI/Toaster/UToaster';
import { LSTokens } from '../../constants/constants';
import { IGetCustomerToken, ILoginUser } from '../../types/user';

const { PROJECT_KEY } = process.env;

// async function getCustomerToken(
//   username: string,
//   password: string,
//   navigate: (path: string) => void,
// ) {
//   try {
//     const tokenResponse = await authClient.customerPasswordFlow({
//       username,
//       password,
//     });
//     Cookies.set(LSTokens.ACCESS_TOKEN, tokenResponse.access_token);
//     navigate(ROUTES.MAIN_PAGE);
//     return tokenResponse.access_token;
//   } catch (e) {
//     throw new Error(e instanceof Error ? e.message : 'error');
//   }
// }

const getCustomerToken = createAsyncThunk(
  'user/getCustomerToken',
  async ({ username, password, navigate }: IGetCustomerToken): Promise<string> => {
    try {
      const tokenResponse = await authClient.customerPasswordFlow({
        username,
        password,
      });
      Cookies.set(LSTokens.ACCESS_TOKEN, tokenResponse.access_token);
      navigate(ROUTES.MAIN_PAGE);
      return tokenResponse.access_token;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'error');
    }
  },
);

// async function createUser(userData: CustomerDraft) {
//   try {
//     const request = {
//       uri: `/${PROJECT_KEY}/customers`,
//       method: 'POST' as MethodType,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: userData,
//     };
//     const response = await ctpClient.execute(request);

//     return response.body;
//   } catch (e) {
//     throw new Error(e instanceof Error ? e.message : 'error');
//   }
// }

const createUser = createAsyncThunk(
  'user/createUser',
  async (userData: CustomerDraft) => {
    try {
      const request = {
        uri: `/${PROJECT_KEY}/customers`,
        method: 'POST' as MethodType,
        headers: {
          'Content-Type': 'application/json',
        },
        body: userData,
      };
      const response = await ctpClient.execute(request);

      return response.body;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'error');
    }
  },
);

// async function loginUser(
//   email: string,
//   password: string,
//   navigate: (path: string) => void,
// ) {
//   try {
//     const request = {
//       uri: `/${PROJECT_KEY}/me/login`,
//       method: 'POST' as MethodType,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: {
//         email,
//         password,
//       },
//     };
//     const response = await ctpClient.execute(request);
//     if (response.statusCode === 200) {
//       navigate(ROUTES.MAIN_PAGE);
//     }
//     notify('Successful sign up!', true);
//     return response.body;
//   } catch (e) {
//     throw new Error(e instanceof Error ? e.message : 'error');
//   }
// }

const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password, navigate }: ILoginUser): Promise<string> => {
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
      notify('Successful sign up!', true);
      return response.body;
    } catch (e) {
      throw new Error(e instanceof Error ? e.message : 'error');
    }
  },
);

const user = {
  createUser,
  getCustomerToken,
  loginUser,
};

export default user;
