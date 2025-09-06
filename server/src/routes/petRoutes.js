import express from 'express';
import authorize from '../middleware/authorize.js';
import registerPet from '../controllers/pets/registerPet.js';

//creamos un router
const router = express.Router();

//Register pet
router.post('/register', authorize, registerPet);

export default router;
