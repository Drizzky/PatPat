import getPool from '../../db/getPool.js';

const checkUserLocked = async (id_user = 0) => {
  const pool = await getPool();
  const query = `SELECT COUNT(*) as loginLocked FROM users_log 
                      WHERE expiration >= NOW()
                        AND state IN ('locked')
                        AND idUser = ? `;
  const [loginLocked] = await pool.query(query, [id_user]);
  return loginLocked[0].loginLocked;
};

export default checkUserLocked;
