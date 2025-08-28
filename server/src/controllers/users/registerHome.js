import saveImg from '../../utils/saveImg.js';
import insertHome from '../../models/users/insertHome.js';
import throwError from '../../utils/throwError.js';

const registerHome = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) throwError('Your house needs a name!', 400);

    let banner = null;

    if (req.files?.banner) banner = await saveImg(req.files.banner, 'banner');

    await insertHome(name, banner);

    res.status(201).send({
      status: 'ok',
      message: 'Welcome home!',
    });
  } catch (err) {
    next(err);
  }
};

export default registerHome;
