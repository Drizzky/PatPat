import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import throwError from '../../utils/throwError.js';
import findUserByEmail from '../../models/users/findUserByEmail.js';

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throwError('Missing fields.', 400);

    const user = await findUserByEmail(email);
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword || !user) throw throwError('Invalid credentials.', 403);

    //if (!user.isVerified) throw throwError('Your account is currently awaiting verification. Please check your email for the verification link and follow the instructions to activate your account.', 403);

    if (user.isBanned) throw throwError('This account has been banned due to a violation of our terms of service. If you believe this was a mistake or wish to appeal the decision, please contact support at ...', 403);

    // TODO comprobar users_log para evitar intentos fallidos repetidos

    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, { expiresIn: '7d' });

    res.status(200);
    res.send({
      status: 'ok',
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export default loginUser;
