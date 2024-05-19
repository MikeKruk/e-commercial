import { useNavigate } from 'react-router-dom';

import { FaHome } from 'react-icons/fa';
import image from '../../assets/not-found.jpg';
import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import ROUTES from '../../utils/routes';

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col items-center h-screen"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        height: '100vh',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-6xl font-bold text-gray-800 mb-4 mt-24">Page not found</h1>
      <p className="text-2xl font-bold text-gray-800 mb-4">
        Sorry, the requested page was not found.
      </p>
      <div className="w-4/12">
        <UFormButton
          type={ButtonType.SUBMIT}
          isDisabled={false}
          text="Back Home"
          icon={<FaHome />}
          className="flex items-center mt-10"
          onClick={() => navigate(ROUTES.MAIN_PAGE)}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
