import selectAllPostsModel from '../../models/posts/selectAllPostsModel.js';

const listPostController = async (req, res, next) => {
    try {
        const posts = await selectAllPostsModel();
        res.send({
            status: 'ok',
            data: {
                posts,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default listPostController;
