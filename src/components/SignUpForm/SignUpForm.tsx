/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import ROUTES from '../../utils/routes';

import UFormInput from '../UI/UFormInput/UFormInput';
import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import UFormSelect from '../UI/UFormSelect/UFormSelect';
import { inputValidators, InputKey, getErrorMessage } from '../../utils/inputValidators';
import user from '../../shared/API/requests/user';

const SignUpForm = () => {
  const [showStreetErrors, setShowStreetErrors] = useState(false);
  const [isStreetEmpty, setIsStreetEmpty] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    try {
      await user.createUser({
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        birthdate: values.birthdate,
        street: values.street,
        city: values.city,
        postal_code: values.postal_code,
        country: values.country,
      });
      console.log('Submit form');
    } catch (error) {
      console.log('Error in registration');
    }
  };

  const handleCountryChange = (selectedCountry: string) => {
    setValues(prev => ({
      ...prev,
      country: selectedCountry,
    }));
  };

  useEffect(() => {
    const isValid =
      Object.values(values).every(val => val) &&
      Object.values(errors).every(err => err.length === 0);
    setIsFormValid(isValid);
  }, [values, errors]);

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
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('email', e.target.value)
              }
              error={errors.email}
            />
          </div>

          <div className="text-left">
            <UFormInput
              title="Password"
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
              placeholder="Postal code"
              value={values.postal_code}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('postal_code', e.target.value)
              }
              error={errors.postal_code}
            />
          </div>

          <div className="text-left">
            <UFormSelect title="Country" onChange={handleCountryChange} />
          </div>

          <div>
            <UFormButton
              type={ButtonType.SUBMIT}
              text="Continue"
              isDisabled={!isFormValid}
            />
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
