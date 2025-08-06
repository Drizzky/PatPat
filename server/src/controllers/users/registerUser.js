import insertUser from '../../models/users/insertUser.js';
import throwError from '../../utils/throwError.js';

const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throwError('Missing fields.', 400);

    // TODO VALIDATE "Password is too weak"

    await insertUser(name, email, password);

    res.status(201).send({
      status: 'ok',
      message: 'Account created successfully. Please follow the instrucions we sent to your email to activate your account.',
    });
  } catch (err) {
    next(err);
  }
};

export default registerUser;
