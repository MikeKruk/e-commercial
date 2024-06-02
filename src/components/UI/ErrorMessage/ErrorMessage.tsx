interface ErrorMessageProp {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProp> = ({ message }) => {
  return <p className="text-red-400 sm:w-[498px]">{message}</p>;
};

export default ErrorMessage;
