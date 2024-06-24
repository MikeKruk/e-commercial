import { ButtonHTMLAttributes } from 'react';

interface IFilterButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled: boolean;
  className?: string;
  onClick: () => void;
  text: string;
}

const UFilterButton: React.FC<IFilterButton> = ({
  isDisabled = true,
  text,
  onClick,
  className,
}) => {
  return (
    <button
      className={`flex w-full justify-center rounded-md  px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm ${isDisabled ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-500 cursor-pointer'}  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 ${className}`}
      disabled={isDisabled}
      type="button"
      onClick={() => onClick && onClick()}
    >
      {text}
    </button>
  );
};

export default UFilterButton;
