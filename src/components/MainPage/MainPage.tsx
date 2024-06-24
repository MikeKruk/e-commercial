import { FaUser, FaList, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Cookies from 'js-cookie';

import { useAppDispatch } from '../../store/hooks';
import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import ROUTES from '../../utils/routes';
import { UToaster } from '../UI/Toaster/UToaster';
import user from '../../API/requests/user';

import { LSTokens } from '../../constants/constants';

const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Пример второго вварианта использования reducer;
  // const [user, setCurrentUser] = useCurrentUser();
  useEffect(() => {
    const accessToken = Cookies.get(LSTokens.ACCESS_TOKEN);
    const anonymousToken = Cookies.get(LSTokens.ANONYMOUS_TOKEN);

    if (!accessToken && !anonymousToken) {
      dispatch(user.getAnonymousToken());
    }
  }, [dispatch]);

  return (
    <div className="mx-auto my-6 flex justify-center items-center flex-col gap-6">
      <div className="w-4/12">
        <UFormButton
          type={ButtonType.SUBMIT}
          isDisabled={false}
          text="Profile"
          icon={<FaUser />}
          className="flex items-center"
          onClick={() => navigate(ROUTES.NOT_FOUND)}
        />
      </div>
      <div className="w-4/12">
        <UFormButton
          type={ButtonType.SUBMIT}
          isDisabled={false}
          text="Catalog"
          icon={<FaList />}
          className="flex items-center"
          onClick={() => {
            navigate(ROUTES.CATALOG);
          }}
        />
      </div>
      <div className="w-4/12">
        <UFormButton
          type={ButtonType.SUBMIT}
          isDisabled={false}
          text="Cart"
          icon={<FaShoppingCart />}
          className="flex items-center"
          onClick={() => navigate(ROUTES.NOT_FOUND)}
        />
      </div>
      <UToaster />
    </div>
  );
};

export default MainPage;
