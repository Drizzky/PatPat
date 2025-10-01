import getPool from '../../db/getPool.js';
import throwError from '../../utils/throwError.js';

const findPetById = async (petId) => {
  const pool = await getPool();

  const [pet] = await pool.query(
    `SELECT id, idHome, name, birthday, idCategory, idColor, idUserCreator, idUserModifier, createdAt, modifiedAt
           FROM pets WHERE id = ?`,
    [petId]
  );

  if (pet.length === 0) throwError('Pet not found', 404);

  return pet[0];
};

export default findPetById;
