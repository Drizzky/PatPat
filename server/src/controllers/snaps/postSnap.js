import saveImg from '../../utils/saveImg.js';
import insertSnap from '../../models/snaps/insertSnap.js';
import throwError from '../../utils/throwError.js';
import findPetById from '../../models/pets/findPetById.js';

const postSnap = async (req, res, next) => {
  try {
    const user = req.user;

    const { idPet, caption } = req.body;

    if (!req.files || !req.files.snap) {
      throwError('Missing snap file.', 400);
    }

    const snapFile = req.files.snap;

    const pet = await findPetById(idPet);
    if (!pet) throwError('Pet not found', 404);

    if (user.idHome !== pet.idHome) throwError('This pet swore loyalty to another home', 403);

    const fileName = await saveImg(snapFile, 'snap');

    const idSnap = await insertSnap(idPet, user.id, caption, fileName);

    res.status(201).send({
      status: 'ok',
      message: 'Snap successfully posted.',
      id: idSnap,
    });
  } catch (err) {
    next(err);
  }
};

export default postSnap;
