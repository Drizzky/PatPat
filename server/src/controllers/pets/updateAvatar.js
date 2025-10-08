import saveImg from '../../utils/saveImg.js';
import insertAvatar from '../../models/pets/insertAvatar.js';
import throwError from '../../utils/throwError.js';
import findPetById from '../../models/pets/findPetById.js';
import removeImgUtil from '../../utils/removeImg.js';

const updateAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.files || !req.files.avatar) {
      throwError('Missing avatar file.', 400);
    }

    const avatarFile = req.files.avatar;

    const pet = await findPetById(id);

    if (!pet) throwError('Pet not found', 404);

    if (pet.avatar) {
      await removeImgUtil(pet.avatar);
    }

    const fileName = await saveImg(avatarFile, 'avatar');

    await insertAvatar(id, fileName);

    res.status(200).json({
      status: 'ok',
      message: 'Avatar updated successfully.',
      avatar: fileName,
    });
  } catch (err) {
    next(err);
  }
};

export default updateAvatar;
