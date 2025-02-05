import getPool from '../../db/getPool.js';

const insertPostModel = async (petId, image, caption, userId) => {
    const pool = await getPool();
    const now = new Date();
    const [newPost] = await pool.query(
        `
        INSERT INTO posts (petId, image, caption, userId, createdAt)
        VALUES(?, ?, ?, ?, ?)
        `,
        [petId, image, caption, userId, now]
    );
    return newPost.insertId;
};

export default insertPostModel;
