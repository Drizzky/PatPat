import throwError from '../utils/throwError.js';

const validatePassword = (req, res, next) => {
  const { password } = req.body;

  // One capital, one number, one symbol
  const pattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,18}$/;

  if (!pattern.test(password)) {
    return next(throwError(400, 'Password must contain at least one uppercase letter, one number, and one special character.'));
  }

  next();
};

export default validatePassword;
