import express from 'express';
// import authorize from './src/middlewares/authorize.js';

import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';

//creamos un router
const router = express.Router();

router.post('/register', registerUser);

// // Validación usuario
// router.put('/validate/:regCode', activateUserController);

// Iniciar sesión de usuario
router.post('/login', loginUser);

// // Cambiar contraseña
// router.post('/password', authorize, updateUserPassController);

export default router;
