import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const findUserById = async (userId) => {
  const pool = await getPool();

  const [user] = await pool.query(
    `
        SELECT id, idHome, name FROM users WHERE id = ?
        `,
    [userId]
  );

  if (user.length === 0) throwError('User not found', 404);

  return user[0];
};

export default findUserById;
