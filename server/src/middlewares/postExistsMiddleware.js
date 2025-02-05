import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const postExistsMiddleware = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const pool = await getPool();

        const [posts] = await pool.query(`SELECT id FROM posts WHERE id = ?`, [
            postId,
        ]);

        if (posts.length < 1) {
            generateErrorUtil('Post not found.', 404);
        }
    } catch (err) {
        next(err);
    }
};

export default postExistsMiddleware;
