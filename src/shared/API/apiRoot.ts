// eslint-disable-next-line
import { ApiRoot, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import ctpClient from './BuildClient';

const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: 'e-commercial-team-key',
});
export default apiRoot;
