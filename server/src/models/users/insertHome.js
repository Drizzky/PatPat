import throwError from '../../utils/throwError.js';
import getPool from '../../db/getPool.js';

const insertHome = async (userId, name, banner) => {
  if (!name) throwError('Your home needs a name!', 400);

  const pool = await getPool();

  const [result] = await pool.query(
    `INSERT INTO home (name, banner, createdAt)
     VALUES (?, ?, NOW())`,
    [name, banner]
  );

  const homeId = result.insertId;
  if (!homeId) throwError('Home creation failed', 500);

  await pool.query(`UPDATE users SET idHome = ? WHERE id = ?`, [homeId, userId]);

  return homeId;
};

export default insertHome;
