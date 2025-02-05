import getPool from '../../db/getPool.js';

const updatePetAvatarModel = async (avatarName, petId) => {
    const pool = await getPool();
    await pool.query(
        `
        UPDATE pets SET avatar = ? WHERE id = ?
        `,
        [avatarName, petId]
    );
};

export default updatePetAvatarModel;
