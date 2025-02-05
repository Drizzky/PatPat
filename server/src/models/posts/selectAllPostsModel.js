import getPool from '../../db/getPool.js';

const selectAllPostsModel = async () => {
    const pool = await getPool();

    const [posts] = await pool.query(`
        SELECT 
            posts.id AS postId,
            posts.image,
            posts.caption,
            posts.createdAt,
            pets.name AS petName,
            pets.avatar AS petAvatar,
            users.username AS author
        FROM posts
        JOIN pets ON posts.petId = pets.id
        JOIN users ON posts.userId = users.id
        ORDER BY posts.createdAt DESC
    `);

    return posts;
};

export default selectAllPostsModel;
