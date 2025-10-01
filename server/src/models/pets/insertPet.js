import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const insertPet = async (idUserCreator, idHome, name) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `INSERT INTO pets (idUserCreator, idHome, name, createdAt)
      VALUES (?, ?, ?, NOW())
      `,
    [idUserCreator, idHome, name]
  );

  const petId = result.insertId;
  if (!petId) throwError('Pet creation failed', 500);

  return petId;
};

export default insertPet;
