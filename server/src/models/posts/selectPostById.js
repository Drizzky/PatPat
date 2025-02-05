import getPool from '../../db/getPool.js';

const selectPostByIdModel = async (postId) => {
    const pool = await getPool();
    const [post] = await pool.query(
        `
        SELECT posts.id AS postId, posts.caption, posts.image, posts.likes, posts.createdAt,
               users.username, 
               (SELECT COUNT(*) FROM likes WHERE postId = posts.id) AS likeCount,
               (SELECT COUNT(*) FROM comments WHERE postId = posts.id) AS commentCount
        FROM posts
        LEFT JOIN users ON posts.userId = users.id
        WHERE posts.id = ?
    `,
        [postId]
    );
    return post[0];
};

export default selectPostByIdModel;
