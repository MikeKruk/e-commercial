const LSTokens = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  ANONYMOUS_TOKEN: 'anonymous_token',
};

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const EMAIL_REGEX = /^s*[a-zA-Z0-9._%+-/]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}s*$/;

const MAX_PRICE = 150;
const DISCOUNT_VALUE = 35;
const MAX_LIMIT = 75;

export { LSTokens, EMAIL_REGEX, PASSWORD_REGEX, MAX_PRICE, DISCOUNT_VALUE, MAX_LIMIT };
