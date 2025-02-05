import getPool from '../../db/getPooljs';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectPetByTypeModel = async (type) => {
    const pool = getPool();
    const [pets] = await pool.query(`SELECT * FROM pets WHERE type = ?`, [
        type,
    ]);

    if (pets.length < 1) {
        generateErrorUtil('No pets found of the specified type.', 404);
    }
};

export default selectPetByTypeModel;
