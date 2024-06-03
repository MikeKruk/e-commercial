// eslint-disable-next-line
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ctpClient } from './BuildClient';

const { PROJECT_KEY } = process.env;

if (!PROJECT_KEY) {
  throw new Error('projectKey is undifined');
}

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: PROJECT_KEY,
});

export default apiRoot;
