import insertPet from '../../models/pets/insertPet.js';
import throwError from '../../utils/throwError.js';
import findUserById from '../../models/users/findUserById.js';

const registerPet = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const user = await findUserById(userId);

    if (!user) throwError('User not found', 404);

    if (!user.idHome) throwError('Your pet needs a home!', 404);

    const { name } = req.body;

    if (!name) throwError('Your pet needs a name!', 400);

    const idPet = await insertPet(userId, user.idHome, name);

    res.status(201).send({
      status: 'ok',
      message: 'Pet successfully added to your home.',
      id: idPet,
    });
  } catch (err) {
    next(err);
  }
};

export default registerPet;
