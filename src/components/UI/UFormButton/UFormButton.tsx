export enum ButtonType {
  SUBMIT = 'submit',
  BUTTON = 'button',
}

interface IFormButton {
  text: string;
  isDisabled: boolean;
  type: ButtonType;
}

const UFormButton = ({ text, type, isDisabled = true }: IFormButton) => {
  return (
    <button
      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
      disabled={isDisabled}
      type={type === ButtonType.SUBMIT ? 'submit' : 'button'}
    >
      {text}
    </button>
  );
};

export default UFormButton;
