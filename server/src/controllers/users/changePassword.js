import changePassword from '../../models/users/changePassword.js';
import throwError from '../../utils/throwError.js';

const changeUserPass = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword || req.body.password;

    if (!currentPassword || !newPassword) {
      throwError('Missing fields.', 400);
    }

    await changePassword(userId, currentPassword, newPassword);

    res.status(200).send({
      status: 'ok',
      message: 'Password changed successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default changeUserPass;
