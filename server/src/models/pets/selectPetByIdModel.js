import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectPetByIdModel = async (petId) => {
    const pool = await getPool();
    const [pets] = await pool.query(
        `SELECT id, name, avatar, type FROM pets WHERE id = ? `,
        [petId]
    );

    if (pets.length < 1) {
        generateErrorUtil('Pet not found', 404);
    }
};

export default selectPetByIdModel;
