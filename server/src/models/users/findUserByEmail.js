import getPool from '../../db/getPool.js';

const findUserByEmail = async (email) => {
  const pool = await getPool();
  const query = `SELECT id, name, email, role, password, isVerified, isBanned FROM users WHERE email = ? `;
  const [users] = await pool.query(query, [email]);
  return users[0];
};

export default findUserByEmail;
