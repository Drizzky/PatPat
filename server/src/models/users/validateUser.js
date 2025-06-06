import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';
import findUserByEmail from './findUserByEmail.js';

const validateUser = async (name, email, password) => {
  const pool = await getPool();

  const user = findUserByEmail(email);

  if (user) throwError('Email already in use.', 409);

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
     VALUES (${id_user}, NOW(), ${regCode}, NOW() + INTERVAL 1 DAY, 'email' )`
  );
};

export default validateUser;
