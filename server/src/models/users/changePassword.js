import throwError from '../../utils/throwError.js';
import getPool from '../../db/getPool.js';
import bcrypt from 'bcrypt';

const changePassword = async (userId, currentPassword, newPassword) => {
  const pool = await getPool();

  const [users] = await pool.query(`SELECT password FROM users WHERE id = ?`, [userId]);

  if (users.length < 1) {
    throwError('User not found', 404);
  }

  const storedPassword = users[0].password;

  const passMatch = await bcrypt.compare(currentPassword, storedPassword);

  if (!passMatch) {
    throwError('Invalid credentials.', 401);
  }

  const hashedPass = await bcrypt.hash(newPassword, 10);

  const now = new Date();

  await pool.query(`UPDATE users SET password = ?, modifiedAt = ? WHERE id = ?`, [hashedPass, now, userId]);
};

export default changePassword;
