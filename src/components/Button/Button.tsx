interface IButton {
  text: string;
  handleClick: (event?: React.MouseEvent | boolean) => void;
  isDisabled: boolean;
}

function Button({ text, handleClick, isDisabled = false }: IButton) {
  return (
    <button className="button" disabled={isDisabled} onClick={handleClick} type="button">
      {text}
    </button>
  );
}

export default Button;
