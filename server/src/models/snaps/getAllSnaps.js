import getPool from '../../db/getPool.js';

const getAllSnaps = async () => {
  const pool = await getPool();

  const [snaps] = await pool.query(`SELECT * FROM snaps`);

  return snaps;
};

export default getAllSnaps;
