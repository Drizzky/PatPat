import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const insertPet = async (idUserCreator, idHome, name) => {
  const pool = await getPool();

  try {
    await pool.query(
      `
      INSERT INTO pets (idUserCreator, idHome, name, createdAt)
      VALUES (?, ?, ?, NOW())
      `,
      [idUserCreator, idHome, name]
    );
  } catch (err) {
    throwError(err.message, 500);
  }
};

export default insertPet;
