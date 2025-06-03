import getPool from '../db/getPool.js';

async function findUserByEmail(email) {
  const pool = await getPool();
  const sql = 'SELECT id, name, email, role, password, isVerified, isBanned FROM users WHERE email = ?';
  const [user] = await pool.query(sql, email);

  return user[0];
}

export { findUserByEmail };
