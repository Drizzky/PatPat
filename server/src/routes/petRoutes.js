import express from 'express';
import authorize from '../middleware/authorize.js';
import registerPet from '../controllers/pets/registerPet.js';
import updatePet from '../controllers/pets/patchPet.js';
import updateAvatar from '../controllers/pets/updateAvatar.js';

// Router
const router = express.Router();

// Register pet
router.post('/register', authorize, registerPet);

// Update pet
router.patch('/:idPet', authorize, updatePet);

// Update avatar
router.put('/avatar/:id', authorize, updateAvatar);

export default router;
