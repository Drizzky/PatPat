import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const updateHome = async (homeId, name, banner) => {
  if (!name) throwError('Your home needs a name!', 400);

  const pool = await getPool();

  await pool.query(
    `
      UPDATE home 
      SET name = ?, 
          ${banner ? 'banner = ?,' : ''}
          modifiedAt = NOW()
      WHERE id = ?
    `,
    banner ? [name, banner, homeId] : [name, homeId]
  );
};

export default updateHome;
