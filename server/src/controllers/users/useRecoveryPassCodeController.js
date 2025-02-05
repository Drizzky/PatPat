import updateUserPassModel from '../../models/users/updateUserPassModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const recoveryPassCodeController = async (req, res, next) => {
    try {
        const { recoverPassCode } = req.params;

        const { newPassword, repeatedNewPass } = req.body;

        if (!newPassword || !repeatedNewPass) {
            generateErrorUtil('Missing fields.', 400);
        }

        if (newPassword !== repeatedNewPass) {
            generateErrorUtil('The passwords do not match', 400);
        }

        await updateUserPassModel(newPassword, recoverPassCode);

        res.send({
            status: 'ok',
            message: 'Password updated.',
        });
    } catch (err) {
        next(err);
    }
};

export default recoveryPassCodeController;
