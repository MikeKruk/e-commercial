interface IFormSelect {
  id: string;
  name: string;
}

const countries = ['Canada', 'Poland'];

function UFormSelect({ id, name }: IFormSelect) {
  return (
    <select
      id={id}
      name={name}
      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
    >
      <option value="" className="text-sm text-gray-400">
        Select country
      </option>

      {countries.map(country => (
        <option value={country} key={country}>
          {country}
        </option>
      ))}
    </select>
  );
}

export default UFormSelect;
