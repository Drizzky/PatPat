import deletePostModel from '../../models/posts/deletePostModel.js';
import removeImgUtil from '../../utils/removeImgUtil.js';
import getPool from '../../db/getPool.js';

const deletePostController = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const pool = getPool();
        const [post] = await pool.query(
            `SELECT image FROM posts WHERE id = ?`,
            [postId]
        );

        if (post.length === 0) {
            const error = new Error('Post not found');
            error.statusCode = 404;
            throw error;
        }

        const imageName = post[0].image;

        await deletePostModel(postId);

        if (imageName) {
            await removeImgUtil(imageName);
        }

        res.send({
            status: 'ok',
            message: 'Post and associated image deleted.',
        });
    } catch (err) {
        next(err);
    }
};

export default deletePostController;
