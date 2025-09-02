import saveImg from '../../utils/saveImg.js';
import insertHome from '../../models/users/insertHome.js';
import throwError from '../../utils/throwError.js';
import findUserById from '../../models/users/findUserById.js';

const registerHome = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await findUserById(userId);
    if (user.idHome) throwError('You can only have one home.', 409);

    const { name } = req.body;

    if (!name) throwError('Your house needs a name!', 400);

    let banner = null;
    if (req.files?.banner) banner = await saveImg(req.files.banner, 'banner');

    await insertHome(req.user.id, name, banner);

    res.status(201).send({
      status: 'ok',
      message: 'Welcome home!',
    });
  } catch (err) {
    next(err);
  }
};

export default registerHome;
