import crypto from 'crypto';
import insertRecoverPassCodeModel from '../../models/users/insertRecoverPassCodeModel.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';
import sendMailUtil from '../../utils/sendMailUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const sendRecoveryPassEmailController = async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            generateErrorUtil('Missing fields.', 400);
        }

        const user = await selectUserByEmailModel(email);

        if (user) {
            const recoverPassCode = crypto.randomBytes(15).toString('hex');

            await insertRecoverPassCodeModel(recoverPassCode, email);
            const emailSubject = 'Pethub password recovery :)';

            const emailBody = `
              There has been a change of password for the account linked to this email. If it was not you, ignore this message.
              
              Please click the following link to reset your password:
                
             ${process.env.CLIENT_URL}/users/password/${recoverPassCode}

            `;
            await sendMailUtil(email, emailSubject, emailBody);
        }

        res.send({
            status: 'ok',
            message:
                'If an account with that email exists, a password recovery link has been sent. Please check your email for further instructions.',
        });
    } catch (err) {
        next(err);
    }
};

export default sendRecoveryPassEmailController;
