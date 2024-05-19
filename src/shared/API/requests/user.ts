import { ISignUpData } from '../../../types/user';
import apiRoot from '../apiRoot';

const { PROJECT_KEY, REGION } = process.env;

async function createUser(signUpData: ISignUpData) {
  try {
    const resp: Response = await fetch(
      `https://api.${REGION}.commercetools.com/${PROJECT_KEY}/me/signup`,
      {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const data = await resp.json();
    console.log(apiRoot);
    if (!resp.ok) {
      throw new Error(data.message || 'Failed to sign up');
    }
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

const user = {
  createUser,
};

export default user;
