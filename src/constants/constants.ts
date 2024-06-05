const LSTokens = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

const EMAIL_REGEX = /^s*[a-zA-Z0-9._%+-/]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}s*$/;

export { LSTokens, EMAIL_REGEX, PASSWORD_REGEX };
