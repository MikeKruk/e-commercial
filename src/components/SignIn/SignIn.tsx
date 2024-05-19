import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

const SignIn = () => {
  return (
    <div>
      Hello, Suign In
      <Link to={ROUTES.SIGNUP}>
        <span>Back to sign up</span>
      </Link>
    </div>
  );
};

export default SignIn;
