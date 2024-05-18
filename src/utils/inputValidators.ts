type InputKey = keyof typeof inputValidators;

const calculateAge = (birthdate: string): boolean => {
  const birthdateObj = new Date(birthdate);
  const today = new Date();
  return today.getFullYear() - birthdateObj.getFullYear() >= 13;
};

const inputValidators = {
  email: (email: string): boolean => /^[^\s@]+@[^\s@]+\.[^\s@]+$|^$/.test(email),
  password: (password: string): boolean =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$|^$/.test(password),
  first_name: (firstName: string): boolean => /^[a-zA-Z]+$|^$/.test(firstName),
  last_name: (lastName: string): boolean => /^[a-zA-Z]+$|^$/.test(lastName),
  birthdate: (birthdate: string): boolean => calculateAge(birthdate),
  street: (street: string): boolean => /^.+$/.test(street),
  billing_street: (billing_street: string): boolean => /^.+$/.test(billing_street),
  city: (city: string): boolean => /^[a-zA-Z]+$|^$/.test(city),
  billing_city: (billing_city: string): boolean => /^[a-zA-Z]+$|^$/.test(billing_city),
  postal_code: (postal_code: string): boolean =>
    /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(postal_code) ||
    /^\d{2}-\d{3}$/.test(postal_code),
  billing_postal_code: (billing_postal_code: string): boolean =>
    /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(billing_postal_code) ||
    /^\d{2}-\d{3}$/.test(billing_postal_code),
};

const getErrorMessage = (key: string): string => {
  switch (key) {
    case 'email':
      return 'Wrong or Invalid email address. Please correct and try again.';
    case 'password':
      return 'Password should contain minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, and 1 number';
    case 'first_name':
    case 'last_name':
      return 'Must contain at least one character and no special characters or numbers';
    case 'birthdate':
      return 'Your age must be greater than or equal to 13 years';
    case 'street':
    case 'billing_street':
      return 'Street must contain at least one character';
    case 'city':
    case 'billing_city':
      return 'City must contain at least one character and no special characters or numbers';
    case 'postal_code':
    case 'billing_postal_code':
      return 'Enter postal code in format: Poland - 00-000; Canada - A1B 2C3';
    default:
      return '';
  }
};

export { inputValidators, type InputKey, getErrorMessage };
