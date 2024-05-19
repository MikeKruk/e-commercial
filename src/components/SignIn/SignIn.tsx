import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ROUTES from '../../utils/routes';
import ISignInFields from '../../types/sign.in.fields';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';
import FormButton, { ButtonType } from '../UI/FormButton/FormButton';
import FormInput from '../UI/Input/Input';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ISignInFields>({ mode: 'onChange' });

  const onSubmit: SubmitHandler<ISignInFields> = data => {
    console.log(data);
  };

  const [showPassword, setShowPassword] = useState<boolean>();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5 items-center"
      >
        {/* <div className="text-left w-full">
          <label>
            Email
            <input
              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full sm:w-[498px]"
              type="text"
              {...register('email', {
                required: 'This field is required',
                pattern: {
                  value: /^s*[a-zA-Z0-9._%+-/]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}s*$/,
                  message:
                    'Email address must be properly formatted (e.g., user@example.com)',
                },
              })}
            />
          </label>
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div> */}
        <div className="text-left w-full">
          <FormInput
            ref={register('email', {
              required: 'This field is required',
            })}
            placeholder="test@gmail.com"
            title="Email"
            type="text"
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>
        <div className="text-left w-full relative">
          <label>
            Password
            {/* <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-0 top-[1.875rem] w-6 h-6 bg-[url('../../assets/password2')] bg-cover bg-no-repeat bg-center"
            /> */}
            <FormButton
              type={ButtonType.BUTTON}
              isDisabled={false}
              className="absolute right-0 top-[1.875rem] w-6 h-6 bg-[url('../../assets/password2')] bg-cover bg-no-repeat bg-center"
              onClick={togglePasswordVisibility}
            />
            <input
              className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full sm:w-[498px]"
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'This field is required',
                pattern: {
                  value:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                  message:
                    'Your password must contain at least 8 characters, at least one uppercase and lowercase letter, one digit, and one special character (e.g., !@#$%^&*), and must not start or end with whitespace characters',
                },
              })}
            />
          </label>
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </div>
        <div>
          {/* <button
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer sm:w-[250px]"
            type="submit"
          >
            Sign In
          </button> */}
          <FormButton type={ButtonType.SUBMIT} text="Sign In" isDisabled={!isValid} />
        </div>
      </form>
      <Link to={ROUTES.SIGNUP}>
        <span>Back to sign up</span>
      </Link>
    </div>
  );
};

export default SignInForm;
