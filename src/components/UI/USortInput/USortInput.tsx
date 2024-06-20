interface ISortInput {
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  checked: boolean;
}

function USortInput({ title, onChange, value, checked = false }: ISortInput) {
  return (
    <label className="flex items-center space-x-2 text-gray-700">
      <input
        type="radio"
        className="mr-2"
        onChange={onChange}
        value={value}
        checked={checked}
      />
      <span className="font-semibold">{title}</span>
    </label>
  );
}

export default USortInput;
