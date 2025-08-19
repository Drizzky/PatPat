import throwError from '../utils/throwError.js';

const validatePassword = (req, res, next) => {
  const password = req.body.password || req.body.newPassword;

  if (!password) {
    return next(throwError('Missing password field', 400));
  }

  // One capital, one number, one special character
  const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/;

  if (!pattern.test(password)) {
    return next(throwError('Password must contain at least one uppercase letter, one number, and one special character.', 400));
  }

  next();
};

export default validatePassword;
