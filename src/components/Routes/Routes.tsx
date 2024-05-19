import { Routes, Route } from 'react-router-dom';

import ROUTES from '../../utils/routes';
import SignIn from '../SignIn/SignIn';
import SignUpForm from '../SignUpForm/SignUpForm';
import MainPage from '../MainPage/MainPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
    <Route path={ROUTES.SIGNIN} element={<SignIn />} />
    <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
