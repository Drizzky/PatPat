import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const verifyEmailUserById = async (id_user = 0, token = '') => {
  if (!id_user) throwError('Missing fields', 400);

  const pool = await getPool();

  if (token) {
    const updateUsersLog = `UPDATE users_log SET state = 'ok' WHERE idUser = ? AND token = ? `;
    await pool.query(updateUsersLog, [id_user, token]);
  }

  await pool.query(`UPDATE users SET isVerified = 1 WHERE id = ?`, [id_user]);
};

export default verifyEmailUserById;
