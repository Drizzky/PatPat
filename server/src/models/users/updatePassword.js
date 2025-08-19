import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const updatePassword = async (id_user, password = '', token = '') => {
  if (!id_user || !password) throwError('Missing fields', 400);

  const pool = await getPool();

  const hashedPass = await bcrypt.hash(password, 10);

  if (token) {
    const updateUsersLog = `UPDATE users_log SET state = 'ok' WHERE idUser = ? AND token = ? `;
    await pool.query(updateUsersLog, [id_user, token]);
  }

  await pool.query(`UPDATE users SET password = ? WHERE id = ?`, [hashedPass, id_user]);
};

export default updatePassword;
