import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import removeImgUtil from '../../utils/removeImgUtil.js';

const deletePetModel = async (petId) => {
    const pool = getPool();

    const [pet] = await pool.query(`SELECT avatar FROM pets WHERE id = ?`, [
        petId,
    ]);

    if (pet.length === 0) {
        throw generateErrorUtil('Pet not found', 404);
    }

    const imgName = pet[0].avatar;
    if (imgName) {
        await removeImgUtil(imgName);
    }

    await pool.query(`DELETE FROM pets WHERE id = ?`, [petId]);
};

export default deletePetModel;
