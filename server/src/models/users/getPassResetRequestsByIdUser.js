import getPool from '../../db/getPool.js';

const getPassResetRequestsByIdUser = async (id_user) => {
  const pool = await getPool();
  const query = `SELECT COUNT(*) as passResetRequests FROM users_log 
                      WHERE date >= NOW() - INTERVAL 30 MINUTE
                        AND state IN ('email')
                        AND idUser = ? `;
  const [passResetRequests] = await pool.query(query, [id_user]);
  return passResetRequests[0].passResetRequests;
};

export default getPassResetRequestsByIdUser;
