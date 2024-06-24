// import { useCallback } from 'react';

// import { resetUser, addUser } from './userSlice';

// import { useAppDispatch, useAppSelector } from '../hooks';
// import type { AppState } from '../index';

// export function useCurrentUser(): [string | null, (user: string) => void] {
//   const dispatch = useAppDispatch();
//   const currentUser = useAppSelector((state: AppState) => state.user.currentUser);

//   const setCurrentUser = useCallback(
//     (user: string) => dispatch(addUser(user)),
//     [dispatch],
//   );

//   return [currentUser, setCurrentUser];
// }

// export function useResetCurrentUser(): () => void {
//   const dispatch = useAppDispatch();

//   return useCallback(() => dispatch(resetUser()), [dispatch]);
// }
