import { Routes, Route } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import ROUTES from '../../utils/routes';
import SignUpForm from '../SignUpForm/SignUpForm';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
    <Route path={ROUTES.SIGNIN} element={<SignIn />} />
  </Routes>
);

export default AppRoutes;
