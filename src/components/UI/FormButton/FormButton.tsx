import { ButtonHTMLAttributes } from 'react';

export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

interface IFormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled: boolean;
  type: ButtonType;
  text?: string;
  onClick?: () => void;
  customClassName?: string;
}

const FormButton: React.FC<IFormButton> = ({
  type,
  isDisabled = true,
  text,
  onClick,
  customClassName,
  ...rest
}) => {
  return (
    <button
      className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isDisabled ? 'bg-gray-300 cursor-no-drop' : 'bg-indigo-600 hover:bg-indigo-500'}  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer sm:w-[250px]`}
      disabled={isDisabled}
      type={type === ButtonType.SUBMIT ? 'submit' : 'button'}
      onClick={() => onClick && onClick()}
      {...rest}
    >
      {text}
    </button>
  );
};

export default FormButton;
