import SdkAuth from '@commercetools/sdk-auth';
import fetch from 'node-fetch';

import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const { CLIENT_ID, CLIENT_SECRET, SCOPE, PROJECT_KEY, API_URL, AUTH_URL } = process.env;

if (!CLIENT_ID || !CLIENT_SECRET || !SCOPE || !PROJECT_KEY || !API_URL || !AUTH_URL) {
  throw new Error('Enviroment variables are undifined');
}

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: [SCOPE],
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  fetch,
};

const authClient = new SdkAuth({
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: [SCOPE],
  fetch,
});

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(PROJECT_KEY)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export { ctpClient, authClient };
