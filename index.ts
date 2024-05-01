export const SignIn = () => {
  const [formState, setFormState] = useState({
    email: '',
  });

  const handler = (key: string, value: string) => [
    setFormState(prev => ({
      ...prev,
      [key]: value,
    })),
  ];

  const dispatch = useDispatch();
  const handleSignIn = () => {
    Object.values(formState).every(val => !!val)
      ? dispatch(signInUser(formState))
      : alert('Enter all fields');
  };
};
