interface IFormCheckbox {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
}

const UFormCheckbox: React.FC<IFormCheckbox> = ({ text, onChange, checked = false }) => {
  return (
    <label>
      <input
        name="checkbox"
        type="checkbox"
        className="mr-5 outline-none"
        onChange={onChange}
        checked={checked}
      />
      {text}
    </label>
  );
};

export default UFormCheckbox;
