interface IButton {
  text: string;
  handleClick: (event?: React.MouseEvent | boolean) => void;
  isDisabled: boolean;
}

function UButton({ text, handleClick, isDisabled = false }: IButton) {
  return (
    <button
      className="px-3 py-2 rounded-md bg-sky-300 text-zinc-50 font-medium hover:bg-sky-500 transition duration-300"
      disabled={isDisabled}
      onClick={handleClick}
      type="button"
    >
      {text}
    </button>
  );
}

export default UButton;
