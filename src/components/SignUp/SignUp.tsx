/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

import UFormInput from '../UI/UFormInput/UFormInput';
import UFormButton from '../UI/UFormButton/UFormButton';
import UFormSelect from '../UI/UFormSelect/UFormSelect';
import UFormLabel from '../UI/UFormLabel/UFormLabel';
import { inputValidators, InputKey, getErrorMessage } from '../../utils/inputValidators';

const SignUp = () => {
  const [showStreetErrors, setShowStreetErrors] = useState(false);
  const [isStreetEmpty, setIsStreetEmpty] = useState(true);

  const [values, setValues] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    street: '',
    city: '',
    postal_code: '',
    country: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    street: '',
    city: '',
    postal_code: '',
    country: '',
  });

  const handleChange = (key: InputKey, value: string) => {
    setValues(prev => ({
      ...prev,
      [key]: value,
    }));

    if (inputValidators[key]) {
      if (key === 'street') {
        setShowStreetErrors(value === '');
        setIsStreetEmpty(value === '');
      }
      const isValid = inputValidators[key](value);
      setErrors(prev => ({
        ...prev,
        [key]: isValid ? '' : value,
      }));
    }
  };

  const handleSignUp = () => {
    console.log('Submit');
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <UFormLabel title="Email" htmlFor="email" />
            <UFormInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('email', e.target.value)
              }
            />
            {errors.email && <p className="text-red-400">{getErrorMessage('email')}</p>}
          </div>

          <div>
            <UFormLabel title="Password" htmlFor="password" />
            <UFormInput
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('password', e.target.value)
              }
            />
            {errors.password && (
              <p className="text-red-400">{getErrorMessage('password')}</p>
            )}
          </div>

          <div>
            <UFormLabel title="First name" htmlFor="first_name" />
            <UFormInput
              id="first_name"
              name="first_name"
              type="text"
              placeholder="First name"
              value={values.first_name}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('first_name', e.target.value)
              }
            />
            {errors.first_name && (
              <p className="text-red-400">{getErrorMessage('first_name')}</p>
            )}
          </div>

          <div>
            <UFormLabel title="Last name" htmlFor="last_name" />
            <UFormInput
              id="last_name"
              name="last_name"
              type="text"
              placeholder="Last name"
              value={values.last_name}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('last_name', e.target.value)
              }
            />
            {errors.last_name && (
              <p className="text-red-400">{getErrorMessage('last_name')}</p>
            )}
          </div>

          <div>
            <UFormLabel title="Date of Birth" htmlFor="birthdate" />
            <UFormInput
              id="birthdate"
              name="birthdate"
              type="date"
              placeholder="Date of Birth"
              value=""
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('birthdate', e.target.value)
              }
            />
            {errors.birthdate && (
              <p className="text-red-400">{getErrorMessage('birthdate')}</p>
            )}
          </div>

          <div>
            <UFormLabel title="Street" htmlFor="street" />
            <UFormInput
              id="street"
              name="street"
              type="text"
              placeholder="Street"
              value=""
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('street', e.target.value)
              }
            />
            {showStreetErrors && isStreetEmpty && (
              <p className="text-red-400">{getErrorMessage('street')}</p>
            )}
          </div>

          <div>
            <UFormLabel title="City" htmlFor="city" />
            <UFormInput
              id="city"
              name="city"
              type="text"
              placeholder="City"
              value=""
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('city', e.target.value)
              }
            />
            {errors.city && <p className="text-red-400">{getErrorMessage('city')}</p>}
          </div>

          <div>
            <UFormLabel title="Postal code" htmlFor="postal_code" />
            <UFormInput
              id="postal_code"
              name="postal_code"
              type="text"
              placeholder="Postal code"
              value=""
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('postal_code', e.target.value)
              }
            />
            {errors.postal_code && (
              <p className="text-red-400">{getErrorMessage('postal_code')}</p>
            )}
          </div>

          <div>
            <UFormLabel title="Country" htmlFor="countries" />
            <UFormSelect id="countries" name="countries" />
          </div>

          <div>
            <UFormButton text="Continue" onClick={handleSignUp} isDisabled={false} />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to={ROUTES.SIGNIN}>
            <span className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign In
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
