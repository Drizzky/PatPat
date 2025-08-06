import checkUserLocked from '../../models/users/checkUserLocked.js';
import findUserByEmail from '../../models/users/findUserByEmail.js';
import getPassResetRequestsByIdUser from '../../models/users/getPassResetRequestsByIdUser.js';
import insertLoginAttempt from '../../models/users/insertLoginAttempt.js';
import resetPassword from '../../models/users/resetPassword.js';
import throwError from '../../utils/throwError.js';

const resetPassUser = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) throwError('Missing fields.', 400);

    const user = await findUserByEmail(email);
    if (!user) throwError(`Couldn't find you Pat² account`, 404);

    const userLocked = await checkUserLocked(user.id);
    if (userLocked > 0) {
      throwError('Account temporary locked. Please try again later', 403);
    }

    const passResetAttempts = await getPassResetRequestsByIdUser(user.id);
    if (passResetAttempts > 5) {
      await insertLoginAttempt(user.id, '', 'NOW() + INTERVAL 30 MINUTE', 'locked');
      throwError('Account locked by to many failed attempts, please wait 30 minutes to try again', 403);
    }

    await resetPassword(user);

    res.status(201).send({
      status: 'ok',
      message: 'Password reset request successful. Please check your email for further steps.',
    });
  } catch (err) {
    next(err);
  }
};

export default resetPassUser;
