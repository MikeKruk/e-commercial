const LSTokens = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
};

export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;

export const EMAIL_REGEX = /^s*[a-zA-Z0-9._%+-/]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}s*$/;

export default LSTokens;
