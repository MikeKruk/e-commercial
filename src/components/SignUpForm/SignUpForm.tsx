/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

import UFormInput from '../UI/UFormInput/UFormInput';
import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import UFormSelect from '../UI/UFormSelect/UFormSelect';
import { inputValidators, InputKey, getErrorMessage } from '../../utils/inputValidators';

const SignUpForm = () => {
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

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent) => {
    e.preventDefault();
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
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="text-left">
            <UFormInput
              title="Email"
              name="email"
              type="email"
              placeholder="Email"
              value={values.email}
              required
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('email', e.target.value)
              }
              error={errors.email}
            />
          </div>

          <div className="text-left">
            <UFormInput
              title="Password"
              required
              name="password"
              type="password"
              placeholder="Password"
              value={values.password}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('password', e.target.value)
              }
              error={errors.password}
            />
          </div>

          <div className="text-left">
            <UFormInput
              title="First name"
              name="first_name"
              required
              placeholder="First name"
              value={values.first_name}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('first_name', e.target.value)
              }
              error={errors.first_name}
            />
          </div>

          <div className="text-left">
            <UFormInput
              title="Last name"
              name="last_name"
              required
              placeholder="Last name"
              value={values.last_name}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('last_name', e.target.value)
              }
              error={errors.last_name}
            />
          </div>

          <div className="text-left">
            <UFormInput
              title="Date of Birth"
              name="birthdate"
              type="date"
              required
              placeholder="Date of Birth"
              value={values.birthdate}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('birthdate', e.target.value)
              }
              error={errors.birthdate}
            />
          </div>

          <div className="text-left">
            <UFormInput
              title="Street"
              name="street"
              required
              placeholder="Street"
              value={values.street}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('street', e.target.value)
              }
            />
            {showStreetErrors && isStreetEmpty && (
              <p className="text-red-400">{getErrorMessage('street')}</p>
            )}
          </div>

          <div className="text-left">
            <UFormInput
              title="City"
              name="city"
              value={values.city}
              required
              placeholder="City"
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('city', e.target.value)
              }
              error={errors.city}
            />
          </div>

          <div className="text-left">
            <UFormInput
              title="Postal"
              name="postal_code"
              required
              placeholder="Postal code"
              value={values.postal_code}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('postal_code', e.target.value)
              }
              error={errors.postal_code}
            />
          </div>

          <div className="text-left">
            <UFormSelect title="Country" />
          </div>

          <div>
            <UFormButton type={ButtonType.SUBMIT} text="Continue" isDisabled={false} />
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

export default SignUpForm;
