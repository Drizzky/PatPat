import throwError from '../../utils/throwError.js';
import getPool from '../../db/getPool.js';

const insertHome = async (name, banner) => {
  if (!name) throwError('Your home needs a name!', 400);

  const pool = await getPool();

  await pool.query(
    `
    INSERT INTO HOME (name, banner, createdAt)
    VALUES (?, ?, NOW())
    `,
    [name, banner]
  );
};

export default insertHome;
