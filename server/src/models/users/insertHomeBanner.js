import throwError from '../../utils/throwError.js';
import getPool from '../../db/getPool.js';

const insertBanner = async (id, banner) => {
  if (!id || !banner) {
    throwError('Missing pet ID or banner', 400);
  }

  const pool = await getPool();

  try {
    const [result] = await pool.query(
      `
      UPDATE HOME
      SET banner = ?, modifiedAt = NOW()
      WHERE id = ?
      `,
      [banner, id]
    );

    if (result.affectedRows === 0) {
      throwError('User is homeless.', 404);
    }
  } catch (err) {
    throwError(err.message);
  }
};

export default insertBanner;
