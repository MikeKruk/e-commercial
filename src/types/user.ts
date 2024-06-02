export const ADD_NAME = 'ADD_NAME';

export interface IUserState {
  userName: string;
  userSurname: string;
}

// payload не обязательный
export interface IUserAction {
  type: string;
  payload: string;
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
