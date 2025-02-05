import getPool from '../../db/getPool.js';
import removeImgUtil from '../../utils/removeImgUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const deletePostModel = async (postId) => {
    const pool = getPool();
    const [img] = await pool.query(`SELECT image FROM posts WHERE Id = ?`, [
        postId,
    ]);

    if (img.length > 0) {
        const imgName = img[0].image;
        await removeImgUtil(imgName);
        await pool.query(`DELETE FROM posts WHERE id = ?`, [postId]);
    } else {
        generateErrorUtil('Post not found', 404);
    }

    await pool.query(`DELETE FROM posts WHERE id = ?`, [postId]);
};

export default deletePostModel;
