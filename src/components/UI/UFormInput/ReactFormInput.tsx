import { RegisterOptions, UseFormRegister } from 'react-hook-form';
import ISignInFields from '../../../types/sign.in.fields';

interface IReactFormInputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  error?: string;
  register: UseFormRegister<ISignInFields>;
  label: keyof ISignInFields;
  registerOptions: RegisterOptions<ISignInFields>;
}

const ReactFormInput: React.FC<IReactFormInputProps> = ({
  label,
  error,
  register,
  registerOptions,
  ...inputProps
}) => (
  <label className="capitalize text-black">
    {label}
    <input
      {...inputProps}
      {...register(label, registerOptions)}
      className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full"
    />
    {error && <p className="text-red-400">{error}</p>}
  </label>
);

export default ReactFormInput;
