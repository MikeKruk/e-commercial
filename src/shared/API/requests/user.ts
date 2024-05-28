// import { ISignUpData } from '../../../types/user';
import apiRoot from '../apiRoot';

// const { PROJECT_KEY, REGION } = process.env;

async function createUser() {
  const data = await apiRoot
    .get()
    .execute()
    .then(resp => resp);
  console.log(data);
}

const user = {
  createUser,
};

export default user;
