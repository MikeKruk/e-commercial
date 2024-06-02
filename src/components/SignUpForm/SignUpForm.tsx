/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CustomerDraft } from '@commercetools/platform-sdk';

import ROUTES from '../../utils/routes';
import UFormInput from '../UI/UFormInput/UFormInput';
import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import UFormSelect, { SelectCountryKey } from '../UI/UFormSelect/UFormSelect';
import UFormCheckbox from '../UI/UFormCheckbox/UFormCheckbox';
import { inputValidators, InputKey } from '../../utils/inputValidators';
import logo from '../../assets/logo.png';

import user from '../../shared/API/requests/user';
import { UToaster, notify } from '../UI/Toaster/UToaster';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [useAsBillingAddress, setUseAsBillingAddress] = useState(false);
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [useDefaultBillingAddress, setUseDefaultBillingAddress] = useState(false);

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
    billing_street: '',
    billing_city: '',
    billing_postal_code: '',
    billing_country: '',
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
    billing_street: '',
    billing_city: '',
    billing_postal_code: '',
    billing_country: '',
  });

  const handleChange = (key: InputKey, value: string) => {
    setValues(prev => {
      const newValues = {
        ...prev,
        [key]: value,
      };
      if (useAsBillingAddress) {
        if (key === 'street') newValues.billing_street = value;
        if (key === 'city') newValues.billing_city = value;
        if (key === 'postal_code') newValues.billing_postal_code = value;
      }
      return newValues;
    });

    if (inputValidators[key]) {
      const isValid = inputValidators[key](value);
      setErrors(prev => ({
        ...prev,
        [key]: isValid ? '' : value,
      }));
    }
  };

  const handleSelectChange = (key: SelectCountryKey, value: string) => {
    setValues(prev => {
      const newValues = {
        ...prev,
        [key]: value,
      };
      if (useAsBillingAddress) {
        newValues.billing_country = value;
      }
      return newValues;
    });
  };

  const handleSignUp: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    try {
      const userData: CustomerDraft = {
        email: values.email,
        password: values.password,
        firstName: values.first_name,
        lastName: values.last_name,
        dateOfBirth: values.birthdate,
        addresses: [
          {
            streetName: values.street,
            city: values.city,
            postalCode: values.postal_code,
            country: values.country === 'Poland' ? 'PL' : 'CA',
            key: 'shipping',
          },
        ],
        shippingAddresses: [0],
        billingAddresses: !useAsBillingAddress ? [1] : [0],
        ...(useDefaultAddress && { defaultShippingAddress: 0 }),
        ...((useDefaultBillingAddress || useAsBillingAddress) && {
          defaultBillingAddress: useAsBillingAddress ? 0 : 1,
        }),
      };
      if (
        !useAsBillingAddress &&
        values.billing_street &&
        values.billing_city &&
        values.billing_postal_code &&
        values.billing_country
      ) {
        userData.addresses?.push({
          streetName: values.billing_street,
          city: values.billing_city,
          postalCode: values.billing_postal_code,
          country: values.billing_country === 'Poland' ? 'PL' : 'CA',
          key: 'billing',
        });
      }

      const response = await user.createUser(userData);
      notify('Successful sign up!', true);
      console.log(response);

      await user.getCustomerToken(values.email, values.password, navigate);
    } catch (error) {
      error instanceof Error ? notify(error.message, false) : console.log('error');
    }
  };

  const handleSelectBillingAddres = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseAsBillingAddress(e.target.checked);
  };
  const handleUseDefaultAddres = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDefaultAddress(e.target.checked);
  };
  const handleUseDefaultBillingAddres = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUseDefaultBillingAddress(e.target.checked);
  };

  useEffect(() => {
    const isValid =
      Object.values(values).every((val, index) => {
        if (useAsBillingAddress && index >= 7 && index <= 10) return true;
        return val;
      }) && Object.values(errors).every(err => err.length === 0);
    setIsFormValid(isValid);
  }, [values, errors, useAsBillingAddress]);

  useEffect(() => {
    if (useAsBillingAddress) {
      setValues(prev => ({
        ...prev,
        billing_street: prev.street,
        billing_city: prev.city,
        billing_postal_code: prev.postal_code,
        billing_country: prev.country,
      }));
    }
  }, [
    useAsBillingAddress,
    values.street,
    values.city,
    values.postal_code,
    values.country,
  ]);

  // if (isFormValid) {
  //   const dataToSignUp = values;
  //   console.log(dataToSignUp);
  // }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8 bg-[#fff] max-w-[700px] rounded-[20px] mx-auto my-6">
      <div className="flex items-center justify-center">
        <img src={logo} alt="logo" className="h-auto w-[150px]" />
      </div>
      <div className="sm:mx-auto sm:w-full">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 m-0">
          Create account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full">
        <form className="space-y-6" onSubmit={handleSignUp}>
          <div className="text-left flex gap-[35px] justify-between flex-col md:flex-row">
            <div className="w-full md:w-1/2">
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

            <div className="w-full md:w-1/2">
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

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Shipping Address
          </h2>

          <div className="text-left">
            <UFormInput
              title="Street"
              name="street"
              placeholder="Street"
              value={values.street}
              handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange('street', e.target.value)
              }
              error={errors.street}
            />
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

          <div className="text-left w-full">
            <UFormSelect
              title="Country"
              onChange={(selectedCountry: string) =>
                handleSelectChange('country', selectedCountry)
              }
            />
          </div>

          <div className="flex  flex-col sm:flex-row justify-between text-black">
            <div>
              <UFormCheckbox
                text="Set as default address"
                checked={useDefaultAddress}
                onChange={e => {
                  handleUseDefaultAddres(e);
                }}
              />
            </div>
            <div>
              <UFormCheckbox
                text="Also use as a billing address"
                checked={useAsBillingAddress}
                onChange={e => handleSelectBillingAddres(e)}
              />
            </div>
          </div>
          {!useAsBillingAddress && (
            <div className="space-y-6">
              <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Billing Address
              </h2>

              <div className="text-left">
                <UFormInput
                  title="Street"
                  name="billing_street"
                  placeholder="Street"
                  value={values.billing_street}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('billing_street', e.target.value)
                  }
                  error={errors.billing_street}
                />
              </div>

              <div className="text-left">
                <UFormInput
                  title="City"
                  name="billing_city"
                  value={values.billing_city}
                  placeholder="City"
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('billing_city', e.target.value)
                  }
                  error={errors.billing_city}
                />
              </div>

              <div className="text-left">
                <UFormInput
                  title="Postal"
                  name="billing_postal_code"
                  placeholder="Postal code"
                  value={values.billing_postal_code}
                  handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange('billing_postal_code', e.target.value)
                  }
                  error={errors.billing_postal_code}
                />
              </div>

              <div className="text-left">
                <UFormSelect
                  title="Country"
                  onChange={(selectedCountry: string) =>
                    handleSelectChange('billing_country', selectedCountry)
                  }
                />
              </div>

              <div className="flex justify-between text-black">
                <div>
                  <UFormCheckbox
                    text="Set as default address"
                    checked={useDefaultBillingAddress}
                    onChange={e => {
                      handleUseDefaultBillingAddres(e);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <UFormButton
              type={ButtonType.SUBMIT}
              text="Continue"
              isDisabled={!isFormValid}
            />
          </div>
        </form>
        <UToaster />
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
