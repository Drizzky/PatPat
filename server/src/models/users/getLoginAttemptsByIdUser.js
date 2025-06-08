import getPool from '../../db/getPool.js';

const getLoginAttemptsByIdUser = async (id_user) => {
  const pool = await getPool();
  const query = `SELECT COUNT(*) as loginAttempts FROM users_log 
                      WHERE date >= NOW() - INTERVAL 30 MINUTE
                        AND state IN ('error')
                        AND idUser = ? `;
  const [loginAttempts] = await pool.query(query, [id_user]);
  return loginAttempts[0].loginAttempts;
};

export default getLoginAttemptsByIdUser;
