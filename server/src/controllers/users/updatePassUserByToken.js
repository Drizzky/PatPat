import checkUserLocked from '../../models/users/checkUserLocked.js';
import findUserByToken from '../../models/users/findUserByToken.js';
import updatePassword from '../../models/users/updatePassword.js';
import throwError from '../../utils/throwError.js';

const updatePassUser = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!token || !password) throwError('Missing fields.', 400);

    // TODO VALIDATE "Password is too weak"

    const id_user = await findUserByToken(token);
    if (!id_user) throwError('Invalid token', 404);

    const userLocked = await checkUserLocked(id_user);
    if (userLocked > 0) {
      throwError('Account temporary locked. Please try again later', 403);
    }

    await updatePassword(id_user, password, token);

    res.status(201).send({
      status: 'ok',
      message: 'Password updated successfully. Please log in.',
    });
  } catch (err) {
    next(err);
  }
};

export default updatePassUser;
