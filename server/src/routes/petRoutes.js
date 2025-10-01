import express from 'express';
import authorize from '../middleware/authorize.js';
import registerPet from '../controllers/pets/registerPet.js';
import updatePet from '../controllers/pets/patchPet.js';

// Router
const router = express.Router();

// Register pet
router.post('/register', authorize, registerPet);

// Update pet
router.patch('/:idPet', authorize, updatePet);

export default router;
