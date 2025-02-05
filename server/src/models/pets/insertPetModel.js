import getPool from '../../db/getPool.js';

const insertPetModel = async (name, color, type, breed, userId) => {
    const pool = await getPool();

    await pool.query(
        `
        INSERT INTO pets (name, color, type, breed, userId) VALUES (?, ?, ?, ?, ?)
        `,
        [name, color, type, breed, userId]
    );
};

export default insertPetModel;
