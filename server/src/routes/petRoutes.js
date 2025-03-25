import authUserMiddleware from '../middlewares/authUserMiddleware.js';
import express from 'express';
import {
    addPetController,
    getPetByUserIdController,
    petAvatarController,
    removePetController,
    petProfileController,
} from '../controllers/pets/index.js';

const router = express.Router();

router.get('/:petId', petProfileController);

router.post('/addpet', authUserMiddleware, addPetController);

router.get('', getPetByUserIdController);

router.put('/avatar', authUserMiddleware, petAvatarController);

router.delete('/:petId', authUserMiddleware, removePetController);

export default router;
