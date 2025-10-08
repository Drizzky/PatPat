import saveImg from '../../utils/saveImg.js';
import throwError from '../../utils/throwError.js';
import removeImgUtil from '../../utils/removeImg.js';
import findHomeById from '../../models/users/findHomebyId.js';
import insertHomeBanner from '../../models/users/insertHomeBanner.js';

const updateHomeBanner = async (req, res, next) => {
  try {
    const user = req.user;

    if (!req.files || !req.files.banner) {
      throwError('Missing banner file.', 400);
    }

    const bannerFile = req.files.banner;

    const home = await findHomeById(user.idHome);

    if (!home) throwError('Home not found.', 404);

    if (home.banner) {
      await removeImgUtil(home.banner);
    }

    const fileName = await saveImg(bannerFile, 'banner');

    await insertHomeBanner(user.idHome, fileName);

    res.status(200).json({
      status: 'ok',
      message: 'Banner updated successfully.',
      banner: fileName,
    });
  } catch (err) {
    next(err);
  }
};

export default updateHomeBanner;
