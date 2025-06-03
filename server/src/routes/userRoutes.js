import express from 'express';
// import authorize from './src/middlewares/authorize.js';

import loginController from '../controllers/users/login-user.js';

//creamos un router
const router = express.Router();

// // Registrar un nuevo usuario
// router.post('/register', registerUserController);

// // Validación usuario
// router.put('/validate/:regCode', activateUserController);

// Iniciar sesión de usuario
router.post('/login', loginController);

// // Cambiar contraseña
// router.post('/password', authorize, updateUserPassController);

export default router;
