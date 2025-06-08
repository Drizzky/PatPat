import getPool from '../../db/getPool.js';

const insertLoginAttempt = async (id_user = 0, token = '', state = 'error') => {
  const pool = await getPool();
  const query = `INSERT INTO users_log (idUser, date, token, expiration, state)
                  VALUES (${id_user}, NOW(), '${token}', NOW(), '${state}' )`;
  await pool.query(query);
  return;
};

export default insertLoginAttempt;
