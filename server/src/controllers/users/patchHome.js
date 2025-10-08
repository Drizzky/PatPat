import findHomeById from '../../models/users/findHomebyId.js';
import throwError from '../../utils/throwError.js';
import updateHome from '../../models/users/updateHome.js';

const patchHome = async (req, res, next) => {
  try {
    const user = req.user;
    const { name } = req.body;

    if (!name) throwError('Your home needs a name!', 400);

    if (!user.idHome) throwError('User is homeless', 404);

    const home = await findHomeById(user.idHome);

    if (!home) throwError('Home not found.', 404);

    await updateHome(home.id, name);

    res.status(200).send({
      status: 'ok',
      message: 'Home updated successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default patchHome;
