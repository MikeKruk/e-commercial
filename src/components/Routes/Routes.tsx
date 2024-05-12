import { Routes, Route } from 'react-router-dom';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';
import ROUTES from '../../utils/routes';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.SIGNUP} element={<SignUp />} />
    <Route path={ROUTES.SIGNIN} element={<SignIn />} />
  </Routes>
);

export default AppRoutes;
