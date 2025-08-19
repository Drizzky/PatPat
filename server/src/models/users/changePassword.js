import validatePassword from '../../utils/validatePassword.js';
import throwError from '../../utils/throwError.js';
import getPool from '../../db/getPool.js';
import bcrypt from 'bcrypt';

const changePassword = async (userId, currentPassword, newPassword) => {
  const pool = await getPool();

  // TODO convertir en un findUserById
  const [users] = await pool.query(`SELECT password FROM users WHERE id = ?`, [userId]);

  if (users.length < 1) throwError('User not found', 404);

  validatePassword(newPassword);

  const storedPassword = users[0].password;

  const passMatch = await bcrypt.compare(currentPassword, storedPassword);

  if (!passMatch) throwError('Invalid credentials.', 401);

  const hashedPass = await bcrypt.hash(newPassword, 10);

  await pool.query(`UPDATE users SET password = ?, modifiedAt = NOW() WHERE id = ?`, [hashedPass, userId]);
};

export default changePassword;
