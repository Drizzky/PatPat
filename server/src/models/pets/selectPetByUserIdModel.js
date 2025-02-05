import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectPetByUserIdModel = async (userId) => {
    const pool = await getPool();
    const [pets] = await pool.query(
        `
        SELECT * FROM pets WHERE userId = ?
        `,
        [userId]
    );
    if (pets.length < 1) {
        generateErrorUtil('Pets not found or not added.', 404);
    }
    return pets;
};

export default selectPetByUserIdModel;
