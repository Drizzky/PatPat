import express from 'express';
import authorize from '../middleware/authorize.js';
import validatePassword from '../middleware/validatePassword.js';
import loginUser from '../controllers/users/loginUser.js';
import registerUser from '../controllers/users/registerUser.js';
import verifyEmailUser from '../controllers/users/verifyEmailUser.js';
import resetPassUser from '../controllers/users/resetPassUser.js';
import updatePassUserByToken from '../controllers/users/updatePassUserByToken.js';
import changeUserPass from '../controllers/users/changePassword.js';

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
router.post('/password-change', authorize, validatePassword, changeUserPass);

export default router;
