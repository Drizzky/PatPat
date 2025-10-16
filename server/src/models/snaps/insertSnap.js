import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const insertSnap = async (idPet, idUserCreator, caption, image) => {
  const pool = await getPool();

  const [result] = await pool.query(
    `INSERT INTO snaps (idPet, idUserCreator, date, caption, image)
      VALUES (?, ?, NOW(), ?, ?)
      `,
    [idPet, idUserCreator, caption, image]
  );

  const snapId = result.insertId;
  if (!snapId) throwError('Snap creation failed', 500);

  return snapId;
};

export default insertSnap;
