import crypto from 'crypto';
import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import sendMail from '../../utils/sendMail.js';
import throwError from '../../utils/throwError.js';
import findUserByEmail from './findUserByEmail.js';

const insertUser = async (name, email, password) => {
  const pool = await getPool();

  const user = await findUserByEmail(email);

  if (user) throwError('Email already in use.', 409);

  const regCode = crypto.randomBytes(15).toString('hex');
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
     VALUES (${id_user}, NOW(), '${regCode}', NOW() + INTERVAL 1 DAY, 'email' )`
  );

  const emailSubject = 'Pat² account activation :)';

  const emailBody = `
  Welcome to Pat² ${name}!

  Thank you for registering!
  We are excited to have you onboard.
  To activate your account and start sharing your beautiful pets, click on the link below :

  ${process.env.CLIENT_URL}/validate/${regCode}
  `;

  await sendMail(email, emailSubject, emailBody);
};

export default insertUser;
