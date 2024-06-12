export const ADD_NAME = 'ADD_NAME';

// для чего нам этот интерфейс?
// export interface IUserState {
//   userName: string;
//   userSurname: string;
// }

export interface IUserState {
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  accessToken: string | null;
  currentUser: string | null;
  statusGetAllActsTypes: string;
  errorGetAllActsTypes: string | null;
}

// payload не обязательный
export interface IUserAction {
  type: string;
  payload: string;
}

export interface IGetCustomerToken {
  username: string;
  password: string;
  navigate: (path: string) => void;
}

export interface ILoginUser {
  email: string;
  password: string;
  navigate: (path: string) => void;
}

// export interface ISignUpData {
//   email: string;
//   password: string;
//   first_name: string;
//   last_name: string;
//   birthdate: string;
//   addresses: [
//     {
//       streetName: string;
//       city: string;
//       postalCode: string;
//       country: 'PL' | 'CA';
//       key: 'shipping';
//     },
//     {
//       billing_street: string;
//       billing_city: string;
//       billing_postal_code: string;
//       billing_country: 'PL' | 'CA';
//       key: 'billing';
//     },
//   ];
// }
