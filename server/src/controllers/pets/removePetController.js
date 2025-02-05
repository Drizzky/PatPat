import deletePetModel from '../../models/pets/deletePetModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const removePetController = async (req, res, next) => {
    try {
        const { petId } = req.params;

        if (!petId) {
            generateErrorUtil('Pet ID is required', 400);
        }

        await deletePetModel(petId);

        res.send({
            status: 'ok',
            message: 'Pet removed successfully!',
        });
    } catch (err) {
        next(err);
    }
};

export default removePetController;
