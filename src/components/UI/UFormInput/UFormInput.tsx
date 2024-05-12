interface IFormInput {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function UFormInput({ id, name, type, placeholder, value, handleChange }: IFormInput) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder={placeholder}
      defaultValue={value}
      onChange={handleChange}
    />
  );
}

export default UFormInput;
