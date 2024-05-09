export const ADD_NAME = 'ADD_NAME';

export interface UserState {
  userName: string;
  userSurname: string;
}

// payload не обязательный
export interface UserAction {
  type: string;
  payload: string;
}
