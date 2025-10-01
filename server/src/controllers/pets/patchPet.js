import updatePet from '../../models/pets/updatePet.js';
import throwError from '../../utils/throwError.js';
import findUserById from '../../models/users/findUserById.js';
import findPetById from '../../models/pets/findPetById.js';
import isDate from '../../utils/isDate.js';

const patchPet = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, birthday, idCategory, idColor } = req.body;

    if (!name) throwError('Your pet needs a name!', 400);
    if (!isDate(birthday)) throwError('Invalid birthday', 400);
    if (isNaN(Number(idCategory))) throwError('Invalid category', 400);
    if (isNaN(Number(idColor))) throwError('Invalid color', 400); // TODO add a isNumber (decimals optional) or isInteger (no decimals)

    const { idPet } = req.params;

    if (!idPet) throwError('Pet not found', 404);

    const user = await findUserById(userId);
    if (!user) throwError('User not found', 404);

    const pet = await findPetById(idPet);
    if (!pet) throwError('Pet not found', 404);

    if (user.idHome !== pet.idHome) throwError('This pet swore loyalty to another home', 403);

    await updatePet(pet.id, userId, name, birthday, idCategory, idColor);

    res.status(200).send({
      status: 'ok',
      message: 'Pet successfully updated',
    });
  } catch (err) {
    next(err);
  }
};

export default patchPet;
