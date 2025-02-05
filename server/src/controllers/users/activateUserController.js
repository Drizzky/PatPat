import updateActiveUserModel from '../../models/users/updateActiveUserModel.js';

const activateUserController = async (req, res, next) => {
    try {
        const { regCode } = req.params;

        await updateActiveUserModel(regCode);

        res.send({
            status: 'ok',
            message: 'User activated.',
        });
    } catch (err) {
        next(err);
    }
};

export default activateUserController;
