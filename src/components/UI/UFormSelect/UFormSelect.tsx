interface IFormSelect {
  title: string;
  name?: string;
  required?: boolean;
  onChange: (option: string) => void;
}

const items = ['Canada', 'Poland'];

function UFormSelect({ title, name = '', required = true, onChange }: IFormSelect) {
  return (
    <label>
      {title}
      <select
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        name={name}
        required={required}
        onChange={e => {
          onChange(e.target.value);
        }}
      >
        <option value="" className="text-sm text-gray-400">
          Select {title}
        </option>

        {items.map(i => (
          <option value={i} key={i}>
            {i}
          </option>
        ))}
      </select>
    </label>
  );
}

// UFormSelect.defaultProps = {
//   name: '',
//   required: true,
// };

export default UFormSelect;
