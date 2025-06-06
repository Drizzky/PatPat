import crypto from 'crypto';
import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import sendMail from '../../utils/sendMail.js';
import throwError from '../../utils/throwError.js';

const insertUser = async (name, email, password) => {
  const pool = await getPool();

  const [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);

  if (users.length > 0) {
    throwError('Email already in use.', 409);
  }

  const regCode = crypto.randomBytes(15).toString('hex');
  const hashedPass = await bcrypt.hash(password, 10);
  const now = new Date();

  await pool.query(
    `INSERT INTO users (name, email, password, regCode, createdAt)
   VALUES (?, ?, ?, ?, ?)`,
    [name, email, hashedPass, regCode, now]
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
