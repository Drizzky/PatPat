import selectPetByUserIdModel from '../../models/pets/selectPetByUserIdModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const getPetByUserIdController = async (req, res, next) => {
    try {
        const { userId } = req.query; // Ensure you're receiving `userId`
        if (!userId) {
            throw generateErrorUtil('User ID is required.', 400);
        }

        const pets = await selectPetByUserIdModel(userId);

        res.send({
            status: 'ok',
            data: { pets },
        });
    } catch (error) {
        next(error);
    }
};

export default getPetByUserIdController;
