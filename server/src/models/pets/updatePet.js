import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const updatePet = async (petId, userId, name, birthday, idCategory, idColor) => {
  if (!name) throwError('Your pet needs a name!', 400);

  const pool = await getPool();

  const [result] = await pool.query(
    `UPDATE pets 
      SET name = ?, 
          birthday = ?, 
          idCategory = ?, 
          idColor = ?, 
          idUserModifier = ?
          modifiedAt = NOW()
      WHERE id = ? `,
    [name, birthday, idCategory, idColor, userId, petId]
  );

  if (result.affectedRows === 0) throwError('Pet update failed', 500);
};

export default updatePet;
