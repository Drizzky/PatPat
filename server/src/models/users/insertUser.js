import crypto from 'crypto';
import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import sendMail from '../../utils/sendMail.js';
import throwError from '../../utils/throwError.js';
import findUserByEmail from './findUserByEmail.js';

const insertUser = async (body) => {
  const { name = '', email = '', password = '' } = body;

  if (!name || !email || !password) throwError('Missing fields.', 400);

  const pool = await getPool();

  // Check if user already exists
  const user = await findUserByEmail(email);
  if (user) throwError('Email already in use.', 409);

  // Hash password
  const hashedPass = await bcrypt.hash(password, 10);

  // Insert user
  const [result] = await pool.query(
    `INSERT INTO users (email, name, password, role, createdAt)
     VALUES (?, ?, ?, 'user', NOW())`,
    [email, name, hashedPass]
  );

  const id_user = result.insertId;
  if (!id_user) throwError('Error creating user', 500);

  // Generate email verification token
  const token = crypto.randomBytes(32).toString('hex');

  await pool.query(
    `INSERT INTO users_log (idUser, date, token, expiration, state)
     VALUES (?, NOW(), ?, NOW() + INTERVAL 1 DAY, 'email')`,
    [id_user, token]
  );

  // Send activation email
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
