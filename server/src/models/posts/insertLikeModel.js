import getPool from '../../db/getPool.js';

const insertLikeModel = async (postId, userId) => {
    const pool = await getPool();
    // Check if the user has already liked this post
    const [existingLike] = await pool.query(
        `SELECT * FROM likes WHERE postId = ? AND userId = ?`,
        [postId, userId]
    );
    if (existingLike.length > 0) {
        // User has already liked this post
        throw new Error('User has already liked this post');
    }
    // Insert the new like
    await pool.query(`INSERT INTO likes (postId, userId) VALUES (?, ?)`, [
        postId,
        userId,
    ]);
    // Increment the like count in the posts table
    await pool.query(`UPDATE posts SET likes = likes + 1 WHERE id = ?`, [
        postId,
    ]);
};

export default insertLikeModel;
