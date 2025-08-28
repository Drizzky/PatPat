import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const updateHome = async (homeId, name, banner) => {
  if (!name) throwError('Your house needs a name!', 400);

  const pool = await getPool();

  if (banner) {
    await pool.query(
      `
        UPDATE HOME SET name = ?, banner = ?, updatedAt = NOW() WHERE id = ?,
      `,
      [(name, banner, homeId)]
    );
  } else {
    await pool.query(
      `
        UPDATE HOME SET name = ?, updatedAt = NOW() WHERE id = ?,
      `,
      [name, homeId]
    );
  }
};

export default updateHome;
