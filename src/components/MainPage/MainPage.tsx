import { FaUser, FaList, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import ROUTES from '../../utils/routes';
import products from '../../shared/API/requests/products';
// import { useCurrentUser } from '../../store/user/hooks';

const MainPage = () => {
  const navigate = useNavigate();
  // const [user, setCurrentUser] = useCurrentUser();

  return (
    <div className="mx-auto my-6 flex justify-center items-center flex-col gap-6">
      {/* {user} */}
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
            navigate(ROUTES.NOT_FOUND);
            products.getProducts();
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
