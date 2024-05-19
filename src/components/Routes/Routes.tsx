import { Routes, Route } from 'react-router-dom';
import ROUTES from '../../utils/routes';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignInForm from '../SignIn/SignIn';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
    <Route path={ROUTES.SIGNIN} element={<SignInForm />} />
  </Routes>
);

export default AppRoutes;
