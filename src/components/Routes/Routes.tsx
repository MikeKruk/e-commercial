import { Routes, Route } from 'react-router-dom';

import ROUTES from '../../utils/routes';
import SignInForm from '../SignInForm/SignInForm';
import SignUpForm from '../SignUpForm/SignUpForm';
import MainPage from '../MainPage/MainPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import CatalogPage from '../../pages/Catalog/CatalogPage';

const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.SIGNUP} element={<SignUpForm />} />
    <Route path={ROUTES.SIGNIN} element={<SignInForm />} />
    <Route path={ROUTES.MAIN_PAGE} element={<MainPage />} />
    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
    <Route path={ROUTES.CATALOG} element={<CatalogPage />} />
  </Routes>
);

export default AppRoutes;
