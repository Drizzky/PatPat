import express from 'express';
import { authUserMiddleware } from '../middlewares/index.js';
import {
    registerUserController,
    activateUserController,
    loginUserController,
    privateUserProfileController,
    userAvatarController,
    sendRecoveryPassEmailController,
    useRecoveryPassCodeController,
} from '../controllers/users/index.js';

const router = express.Router();

// User register.
router.post('/register', registerUserController);

// Activate user/account.
router.put('/validate/:regCode', activateUserController);

// User login.
router.post('/login', loginUserController);

// Private user info.
router.get('', authUserMiddleware, privateUserProfileController);

// User avatar.
router.put('/avatar', authUserMiddleware, userAvatarController);

// Sends password recovery code to users email.
router.put('/password/reset', sendRecoveryPassEmailController);

// Updates users password with recovery code.
router.put('/password/reset/:recoverPassCode', useRecoveryPassCodeController);

export default router;
