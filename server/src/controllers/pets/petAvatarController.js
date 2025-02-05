import selectPetbyIdModel from '../../models/pets/selectPetByIdModel.js';
import updatePetAvatarModel from '../../models/pets/updatePetAvatarModel.js';
import saveImgUtil from '../../utils/saveImgUtil.js';
import removeImgUtil from '../../utils/removeImgUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const petAvatarController = async (req, res, next) => {
    try {
        const avatar = req.files?.avatar;

        if (!avatar) {
            generateErrorUtil('Missing fields', 400);
            return;
        }

        const pet = await selectPetbyIdModel(req.pet.id);

        if (pet.avatar) {
            await removeImgUtil(pet.avatar);
        }

        const avatarName = await saveImgUtil(avatar, 100, true);

        await updatePetAvatarModel(avatarName, req.pet.id);

        res.send({
            status: 'ok',
            message: 'Updated avatar.',
            data: {
                pet: {
                    avatar: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default petAvatarController;
