import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ROUTES from '../../utils/routes';
import ISignInFields from '../../types/sign.in.fields';
import FormButton, { ButtonType } from '../UI/UFormButton/UFormButton';
import ReactFormInput from '../UI/UFormInput/ReactFormInput';

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
        <div className="text-left w-full">
          <ReactFormInput
            placeholder="test@gmail.com"
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
        <div className="text-left w-full relative">
          <ReactFormInput
            type={showPassword ? 'text' : 'password'}
            error={errors.password ? errors.password.message : undefined}
            register={register}
            label="password"
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
          <FormButton
            type={ButtonType.BUTTON}
            isDisabled={false}
            className="absolute right-0 top-[1.875rem] w-6 h-6 bg-[url('../../assets/password2')] bg-cover bg-no-repeat bg-center"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div>
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
