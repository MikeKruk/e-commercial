import { ButtonHTMLAttributes } from 'react';

export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

interface IFormButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled: boolean;
  type: ButtonType;
  className?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  text?: string;
  customClassName?: string;
}

const UFormButton: React.FC<IFormButton> = ({
  type,
  isDisabled = true,
  text,
  onClick,
  className,
  icon,
  customClassName,
  ...rest
}) => {
  return (
    <button
      className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'}  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${className}`}
      disabled={isDisabled}
      type={type === ButtonType.SUBMIT ? 'submit' : 'button'}
      onClick={() => onClick && onClick()}
      {...rest}
    >
      {icon && <span className="mr-2">{icon}</span>}

      {text}
    </button>
  );
};

export default UFormButton;
