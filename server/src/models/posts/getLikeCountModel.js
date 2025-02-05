import getPool from '../../db/getPool.js';

const getLikeCountModel = async (postId) => {
    const pool = await getPool();
    const [likes] = await pool.query(
        `SELECT COUNT(*) AS likeCount FROM likes WHERE postId = ?`,
        [postId]
    );
    return likes[0].likeCount;
};

export default getLikeCountModel;
