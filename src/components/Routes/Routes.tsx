import { Routes, Route } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import ROUTES from '../../utils/routes';
import SignUpForm from '../SignUpForm/SignUpForm';
import MainPage from '../MainPage/MainPage';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
    <Route path={ROUTES.SIGNIN} element={<SignIn />} />
    <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
  </Routes>
);

export default AppRoutes;
