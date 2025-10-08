import express from 'express';
import authorize from '../middleware/authorize.js';
import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import verifyEmailUser from '../controllers/users/verifyEmailUser.js';
import resetPassUser from '../controllers/users/resetPassUser.js';
import updatePassUserByToken from '../controllers/users/updatePassUserByToken.js';
import changeUserPass from '../controllers/users/changePassword.js';
import registerHome from '../controllers/users/registerHome.js';
import patchHome from '../controllers/users/patchHome.js';
import updateHomeBanner from '../controllers/users/updateHomeBanner.js';

// Router
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

// Update homes name.
router.patch('/home', authorize, patchHome);

//Update home banner.
router.put('/home/banner/', authorize, updateHomeBanner);

export default router;
