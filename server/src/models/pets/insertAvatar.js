import throwError from '../../utils/throwError.js';
import getPool from '../../db/getPool.js';

const insertAvatar = async (id, avatar) => {
  if (!id || !avatar) {
    throwError('Missing pet ID or avatar URL', 400);
  }

  const pool = await getPool();

  try {
    const [result] = await pool.query(
      `
      UPDATE PETS
      SET avatar = ?, modifiedAt = NOW()
      WHERE id = ?
      `,
      [avatar, id]
    );

    if (result.affectedRows === 0) {
      throwError('Pet not found', 404);
    }
  } catch (err) {
    throwError(err.message);
  }
};

export default insertAvatar;
