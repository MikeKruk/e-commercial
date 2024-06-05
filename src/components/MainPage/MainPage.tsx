import { FaUser, FaList, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import ROUTES from '../../utils/routes';

const MainPage = () => {
  const navigate = useNavigate();
  // Пример второго вварианта использования reducer;
  // const [user, setCurrentUser] = useCurrentUser();

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
    </div>
  );
};

export default MainPage;
