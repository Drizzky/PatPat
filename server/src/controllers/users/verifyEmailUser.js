import findUserByToken from '../../models/users/findUserByToken.js';
import verifyEmailUserById from '../../models/users/verifyEmailUserById.js';
import throwError from '../../utils/throwError.js';

const verifyEmailUser = async (req, res, next) => {
  try {
    const { token } = req.params;

    if (!token) throwError('Missing fields.', 400);

    const id_user = await findUserByToken(token);

    if (!id_user) throwError('Invalid token', 404);

    await verifyEmailUserById(id_user, token);

    res.status(202).send({
      status: 'ok',
      message: 'Account verified successfully. Please log in.',
    });
  } catch (err) {
    next(err);
  }
};

export default verifyEmailUser;
