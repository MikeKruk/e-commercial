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

export interface ISignUpData {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birthdate: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
}
