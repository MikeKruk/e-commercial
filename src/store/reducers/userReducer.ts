import { ADD_NAME, UserAction, UserState } from '../../types/user';

const initialState: UserState = {
  userName: '',
  userSurname: '',
};

// правильно state должен быть первым параметром(ругается линт)
const userReducer = (action: UserAction, state = initialState): UserState => {
  switch (action?.type) {
    case ADD_NAME:
      return { ...state, userName: action.payload };
    default:
      return state;
  }
};

export default userReducer;
