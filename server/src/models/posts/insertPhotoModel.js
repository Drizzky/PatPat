import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const insertPhotoModel = async (photoName, postId) => {
    const pool = await getPool();

    const [photo] = await pool.query(
        `SELECT image FROM posts where postId = ?`,
        [postId]
    );

    if (photo.length > 1) {
        generateErrorUtil('Only one photo per post.', 409);
    }

    const now = new Date();
};

export default insertPhotoModel;
