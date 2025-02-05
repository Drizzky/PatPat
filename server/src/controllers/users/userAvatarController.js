import selectUserByIdModel from '../../models/users/selectUserByIdModel.js';
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';
import saveImgUtil from '../../utils/saveImgUtil.js';
import removeImgUtil from '../../utils/removeImgUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const userAvatarController = async (req, res, next) => {
    try {
        const avatar = req.files?.avatar;

        if (!avatar) {
            generateErrorUtil('Missing fields', 400);
        }

        const user = await selectUserByIdModel(req.user.id);

        if (user.avatar) {
            await removeImgUtil(user.avatar);
        }

        const avatarName = await saveImgUtil(avatar, 100, true);

        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Updated avatar.',
            data: {
                user: {
                    avatar: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};

export default userAvatarController;
