import crypto from 'crypto';
import getPool from '../../db/getPool.js';
import sendMail from '../../utils/sendMail.js';
import throwError from '../../utils/throwError.js';

const resetPassword = async (user = {}) => {
  if (!user?.id) throwError('Missing fields', 400);

  const pool = await getPool();

  const resetCode = crypto.randomBytes(15).toString('hex');

  await pool.query(
    `INSERT INTO users_log (idUser, date, token, expiration, state)
     VALUES (${user.id}, NOW(), '${resetCode}', NOW() + INTERVAL 1 DAY, 'email' )`
  );

  const emailSubject = 'Pat² password reset';

  const emailBody = `
  Hi ${user.name}!

  We've received a password reset request.
  To continue with the process, please click on the link below:

  ${process.env.CLIENT_URL}/password-reset/${resetCode}

  If you didn't attempt to reset your password, please ignore this email. Don't share or forward the link with anyone.
  If you are concerned about your account's safety, please contact us at support@patpat.cat.
  `;

  await sendMail(user.email, emailSubject, emailBody);
};

export default resetPassword;
