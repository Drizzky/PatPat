import throwError from './throwError.js';

const validatePassword = (password = '') => {
  // One uppercase, one lowercase, one number, one symbol
  const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]{8,18}$/;

  if (!pattern.test(password)) {
    return throwError('Password must be 8 to 18 characters and must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&.).', 400);
  }
};

export default validatePassword;
