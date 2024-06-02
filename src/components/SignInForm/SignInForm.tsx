/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/no-unescaped-entities */
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { useState } from 'react';
import ROUTES from '../../utils/routes';
import ISignInFields from '../../types/sign.in.fields';
import UFormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import ReactFormInput from '../UI/UFormInput/ReactFormInput';
import user from '../../shared/API/requests/user';
import { UToaster, notify } from '../UI/Toaster/UToaster';

const SignInForm = () => {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignInFields>({ mode: 'onChange' });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<ISignInFields> = async data => {
    const { email, password } = getValues();
    
    try {
      await user.loginUser(email, password, navigate);
      notify('Successful sign in!', true)
      
      await user.getCustomerToken(email, password, navigate);
    } catch (error) {
      error instanceof Error ? notify(error.message, false) : console.log('error');
    }
       };

  const [showPassword, setShowPassword] = useState<boolean>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-3 lg:px-8 bg-[#fff] max-w-[700px] rounded-[20px] mx-auto my-6">
      <div className="mt-10 sm:mx-auto sm:w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-left flex flex-col gap-[24px] justify-between items-center">
            <div className="w-1/2">
              <ReactFormInput
                placeholder="your@gmail.com"
                type="text"
                error={errors.email ? errors.email.message : undefined}
                register={register}
                label="email"
                registerOptions={{
                  required: 'This field is required',
                  pattern: {
                    value: /^s*[a-zA-Z0-9._%+-/]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}s*$/,
                    message:
                      'Email address must be properly formatted (e.g., user@example.com)',
                  },
                }}
              />
            </div>
            <div className="w-1/2 relative">
              <ReactFormInput
                type={showPassword ? 'text' : 'password'}
                error={errors.password ? errors.password.message : undefined}
                register={register}
                label="password"
                placeholder="Enter your password"
                registerOptions={{
                  required: 'This field is required',
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                    message:
                      'Your password must contain at least 8 characters, at least one uppercase and lowercase letter, one digit, and one special character (e.g., !@#$%^&*), and must not start or end with whitespace characters',
                  },
                }}
              />
              <button
                type="button"
                className="bg-transparent hover:bg-transparent absolute right-0.5 top-[1.875rem] h-6 w-[10px] shadow-none"
                onClick={togglePasswordVisibility}
              >
                icon=
                {showPassword ? (
                  <IoEyeOff className="absolute text-black right-0.5 top-0 h-6 bg-cover bg-no-repeat bg-center decoration-black" />
                ) : (
                  <IoEye className="absolute text-black right-0.5 top-0 h-6 bg-cover bg-no-repeat bg-center decoration-black" />
                )}
              </button>
            </div>
            <div>
              <UFormButton
                type={ButtonType.SUBMIT}
                text="Sign In"
                isDisabled={!isValid}
              />
            </div>
          </div>
        </form>
        <UToaster />
        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account yet?{' '}
          <Link to={ROUTES.SIGNUP}>
            <span className="font-semibold text-indigo-600 hover:text-indigo-500">
              Sign up now!
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
