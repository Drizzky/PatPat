import selectPostByIdModel from '../../models/posts/selectPostById.js';

const getPostController = async (req, res, next) => {
    try {
        console.log('fetching posts...');

        const { postId } = req.params;
        const post = await selectPostByIdModel(postId);

        res.send({
            status: 'ok',
            data: {
                post,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getPostController;
