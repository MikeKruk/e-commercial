import { Bounce, ToastContainer, ToastOptions, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const notify = (message: string, isSuccess: boolean) => {
  const options: ToastOptions = {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  };

  isSuccess ? toast.success(message, options) : toast.error(message, options);
};

const UToaster: React.FC = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export { UToaster, notify };
