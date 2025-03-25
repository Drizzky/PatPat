import selectPetByIdModel from '../../models/pets/selectPetByIdModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const petProfileController = async (req, res, next) => {
    try {
        const { petId } = req.params; // Extract petId from request parameters
        const pet = await selectPetByIdModel(petId); // Pass petId to the model

        if (!pet) {
            generateErrorUtil('Pet not found', 404);
        }

        res.send({
            status: 'ok',
            data: { pet },
        });
    } catch (err) {
        next(err);
    }
};

export default petProfileController;
