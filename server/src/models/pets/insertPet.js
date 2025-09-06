import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const insertPet = async (idUserCreator, idHome, name, birthday) => {
  const pool = await getPool();

  try {
    await pool.query(
      `
      INSERT INTO pets (idUserCreator, idHome, name, birthday, createdAt)
      VALUES (?, ?, ?, ?, NOW())
      `,
      [idUserCreator, idHome, name, birthday]
    );
  } catch (err) {
    throwError(err.message, 500);
  }
};

export default insertPet;
