interface IFormLabel {
  htmlFor: string;
  title: string;
}

const UFormLabel: React.FC<IFormLabel> = ({ htmlFor, title }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium leading-6 text-gray-900 text-left"
    >
      {title}
    </label>
  );
};

export default UFormLabel;
