import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const findHomeById = async (homeId) => {
  const pool = await getPool();

  const [home] = await pool.query(
    `
    SELECT id, name, banner, createdAt FROM home WHERE id = ?
    `,
    [homeId]
  );

  if (home.length === 0) throwError('Home not found.', 404);

  return home[0];
};

export default findHomeById;
