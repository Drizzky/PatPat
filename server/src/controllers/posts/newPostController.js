import insertPostModel from '../../models/posts/insertPostModel.js';
import saveImgUtil from '../../utils/saveImgUtil.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import getPool from '../../db/getPool.js';

const newPostController = async (req, res, next) => {
    try {
        const { petName, caption } = req.body;

        if (!petName || !caption || !req.files?.image) {
            generateErrorUtil(
                'Pet name, caption, and an image are required.',
                400
            );
        }

        const pool = await getPool();
        const [pet] = await pool.query(
            `SELECT id FROM pets WHERE name = ? and userId = ?`,
            [petName, req.user?.id]
        );

        if (pet.length === 0) {
            generateErrorUtil(
                'Pet not found or does not belong to the user',
                404
            );
        }

        const petId = pet[0].id;

        const image = await saveImgUtil(req.files.image, 800);

        if (!image) {
            throw generateErrorUtil('Image upload failed.', 500);
        }

        const userId = req.user?.id;

        if (!userId) {
            generateErrorUtil('User not authenticated', 401);
        }

        const postId = await insertPostModel(petId, image, caption, userId);

        res.status(201).json({
            status: 'success',
            message: 'Post created successfully',
            data: {
                postId,
                petName,
                caption,
                image,
                userId,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default newPostController;
