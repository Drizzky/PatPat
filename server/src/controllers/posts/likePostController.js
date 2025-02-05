import insertLikeModel from '../../models/posts/insertLikeModel.js';

const likePostController = async (req, res, next) => {
    try {
        console.log('REQUESTED PARAMS:', req.params);
        const { postId } = req.params;

        const numLikes = await insertLikeModel(req.user.id, postId);

        res.send({
            status: 'ok',
            message: 'like added successfully',
            data: { numLikes },
        });
    } catch (err) {
        next(err);
    }
};

export default likePostController;
