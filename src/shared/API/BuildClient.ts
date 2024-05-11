import fetch from 'node-fetch';

import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';

const projectKey = 'e-commercial-team-key';

const scopes = [
  'create_anonymous_token:e-commercial-team-key manage_categories:e-commercial-team-key manage_types:e-commercial-team-key manage_my_payments:e-commercial-team-key manage_project_settings:e-commercial-team-key manage_order_edits:e-commercial-team-key manage_my_profile:e-commercial-team-key manage_tax_categories:e-commercial-team-key manage_customer_groups:e-commercial-team-key manage_shopping_lists:e-commercial-team-key manage_orders:e-commercial-team-key manage_extensions:e-commercial-team-key manage_my_shopping_lists:e-commercial-team-key manage_discount_codes:e-commercial-team-key manage_payments:e-commercial-team-key manage_products:e-commercial-team-key manage_my_orders:e-commercial-team-key manage_customers:e-commercial-team-key manage_cart_discounts:e-commercial-team-key manage_shipping_methods:e-commercial-team-key',
];

const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: 'https://auth.europe-west1.gcp.commercetools.com',
  projectKey,
  credentials: {
    clientId: 'oQQxD9-ubX-EaV6y5trdQb3x',
    clientSecret: 'nS5DaVkbcD4fG94F27bTDVAv7ewMG-qy',
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: 'https://api.europe-west1.gcp.commercetools.com',
  fetch,
};

// Export the ClientBuilder
const ctpClient = new ClientBuilder()
  .withProjectKey(projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware() // Include middleware for logging
  .build();

export default ctpClient;
