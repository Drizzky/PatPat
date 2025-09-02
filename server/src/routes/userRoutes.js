import express from 'express';
import authorize from '../middleware/authorize.js';
import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import verifyEmailUser from '../controllers/users/verifyEmailUser.js';
import resetPassUser from '../controllers/users/resetPassUser.js';
import updatePassUserByToken from '../controllers/users/updatePassUserByToken.js';
import changeUserPass from '../controllers/users/changePassword.js';
import registerHome from '../controllers/users/registerHome.js';
import modifyHome from '../controllers/users/modifyHome.js';

//creamos un router
const router = express.Router();

// Registrarse
router.post('/register', registerUser);

// Verificar email usuario
router.put('/verify-email/:token', verifyEmailUser);

// Resetear contraseña
router.post('/password-reset', resetPassUser);
router.post('/password-reset/:token', updatePassUserByToken);

// Iniciar sesión de usuario
router.post('/login', loginUser);

// Cambiar contraseña (con auth)
router.post('/password-change', authorize, changeUserPass);

// Register a home
router.post('/home', authorize, registerHome);

// Update homes name and optionally, the banner.
router.patch('/home', authorize, modifyHome);

export default router;
