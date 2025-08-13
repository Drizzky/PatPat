import crypto from 'crypto';
import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import sendMail from '../../utils/sendMail.js';
import throwError from '../../utils/throwError.js';

const insertUser = async (name = '', email = '', password = '') => {
  if (!name || !email || !password) throwError('Missing fields.', 400);

  const pool = await getPool();

  const token = crypto.randomBytes(32).toString('hex');
  const hashedPass = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `INSERT INTO users (email, name, password, role, createdAt)
     VALUES (?, ?, ?, 'user', NOW())`,
    [email, name, hashedPass]
  );

  const id_user = result.insertId;

  if (!id_user) throwError('Error creating user', 404);

  await pool.query(
    `INSERT INTO users_log (idUser, date, token, expiration, state)
     VALUES (${id_user}, NOW(), '${token}', NOW() + INTERVAL 1 DAY, 'email' )`
  );

  const emailSubject = 'Pat² account activation :)';

  const emailBody = `
  Welcome to Pat² ${name}!

  Thank you for registering!
  We are excited to have you onboard.
  To activate your account and start sharing your beautiful pets, click on the link below:

  ${process.env.CLIENT_URL}/verify-email/${token}
  `;

  await sendMail(email, emailSubject, emailBody);
};

export default insertUser;
