import insertPetModel from '../../models/pets/insertPetModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const addPetController = async (req, res, next) => {
    try {
        const { name, color, type, breed, userId } = req.body;

        if (!name || !color || !type || !breed || !userId) {
            generateErrorUtil('Missing fields.', 400);
        }

        await insertPetModel(name, color, type, breed, userId);

        res.status(201).send({
            status: 'ok',
            message: 'Pet added successfully!',
        });
    } catch (err) {
        next(err);
    }
};

export default addPetController;
