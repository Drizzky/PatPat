import getPool from '../../db/getPool.js';

const removeLikeModel = async (postId, userId) => {
    const pool = await getPool();

    await pool.query(`DELETE FROM likes WHERE postId = ? AND userId = ?`, [
        postId,
        userId,
    ]);
};

export default removeLikeModel;
