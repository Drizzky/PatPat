import findUserById from '../../models/users/findUserById.js';
import findHomeById from '../../models/users/findHomebyId.js';
import throwError from '../../utils/throwError.js';
import saveImg from '../../utils/saveImg.js';
import removeImg from '../../utils/removeImg.js';
import updateHome from '../../models/users/updateHome.js';

const patchHome = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    if (!name) throwError('Your home needs a name!', 400);

    const user = await findUserById(userId);
    if (!user.idHome) throwError('User is homeless', 404);

    const home = await findHomeById(user.idHome);

    let banner = null;
    if (req.files?.banner) {
      banner = await saveImg(req.files.banner, 'banner');
      if (home.banner) await removeImg(home.banner);
    }

    await updateHome(home.id, name, banner);

    res.status(200).send({
      status: 'ok',
      message: 'Home updated successfully.',
    });
  } catch (err) {
    next(err);
  }
};

export default patchHome;
