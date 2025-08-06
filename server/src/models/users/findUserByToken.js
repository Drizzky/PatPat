import getPool from '../../db/getPool.js';

const findUserByToken = async (token) => {
  const pool = await getPool();
  const query = `SELECT idUser FROM users_log 
                                        WHERE expiration >= NOW()
                                                AND state = 'email' 
                                                  AND token = ? `;
  const [users] = await pool.query(query, [token]);
  return users[0]?.idUser;
};

export default findUserByToken;
