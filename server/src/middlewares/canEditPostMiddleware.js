import getPool from '../db/getPool.js';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const canEditPostMiddleware = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const pool = await getPool();
        const [posts] = await pool.query(
            `SELECT userId FROM posts WHERE id = ?`,
            [postId]
        );

        if (posts[0].userId !== req.user.id && req.user.role !== 'admin') {
            generateErrorUtil('Action denied - 401 forbidden', 401);
        }

        next();
    } catch (err) {
        next(err);
    }
};

export default canEditPostMiddleware;
