import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import throwError from '../../utils/throwError.js';
import findUserByEmail from '../../models/users/findUserByEmail.js';
import checkUserLocked from '../../models/users/checkUserLocked.js';
import insertLoginAttempt from '../../models/users/insertLoginAttempt.js';
import getLoginAttemptsByIdUser from '../../models/users/getLoginAttemptsByIdUser.js';

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throwError('Missing fields.', 400);

    const user = await findUserByEmail(email);
    if (!user) throwError(`Couldn't find your Pat² account`, 404);

    const userLocked = await checkUserLocked(user.id);
    if (userLocked > 0) {
      throwError('Account temporary locked. Please try again later', 403);
    }

    const loginAttempts = await getLoginAttemptsByIdUser(user.id);
    if (loginAttempts > 5) {
      await insertLoginAttempt(user.id, '', 'NOW() + INTERVAL 30 MINUTE', 'locked');
      throwError('Account locked by to many failed attempts, please wait 30 minutes to try again', 403);
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      await insertLoginAttempt(user.id);
      throwError('Invalid credentials.', 403);
    }

    if (!user.isVerified) {
      throwError('Your account is currently awaiting verification. Please check your email for the verification link and follow the instructions to activate your account.', 403);
      // TODO, SI EL TOKEN DE VERIFICACION CADUCO, REENVIARLO
    }

    if (user.isBanned) throwError('This account has been banned due to a violation of our terms of service. If you believe this was a mistake or wish to appeal the decision, please contact support at support@patpat.cat', 403);

    const tokenInfo = {
      id: user.id,
      role: user.role,
      idHome: user.idHome,
    };

    // token válido 7 días
    const token = jwt.sign(tokenInfo, process.env.SECRET, { expiresIn: '7d' });

    // token válido 7 días
    await insertLoginAttempt(user.id, token, 'NOW() + INTERVAL 7 DAY', 'ok');

    res.status(200).send({
      status: 'ok',
      message: 'Welcome! 😻',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        idHome: user.idHome,
        token: token,
      },
    });
  } catch (err) {
    next(err);
  }
};

export default loginUser;
