import { getErrorMessage } from '../../../utils/inputValidators';

interface IInput {
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  title: string;
  error?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UFormInput: React.FC<IInput> = ({
  name,
  type = 'text',
  placeholder,
  value,
  required = true,
  handleChange,
  title,
  error,
}) => {
  return (
    <label>
      {title}
      <input
        name={name}
        type={type}
        required={required}
        className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-full sm:w-[498px]"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
      {error && <p className="text-red-400">{getErrorMessage(name)}</p>}
    </label>
  );
};

export default UFormInput;
