import express from 'express';

import {
    authUserMiddleware,
    postExistsMiddleware,
    canEditPostMiddleware,
} from '../middlewares/index.js';

import {
    newPostController,
    listPostController,
    getPostController,
    deletePostController,
    likePostController,
} from '../controllers/posts/index.js';

const router = express.Router();

//Creates post.
router.post('', authUserMiddleware, newPostController);

//Returns posts.
router.get('', listPostController);

//Returns post by ID
router.get('/:postId', postExistsMiddleware, getPostController);

//Like or unlike posts.
router.post(
    '/:postId/likes',
    authUserMiddleware,
    postExistsMiddleware,
    likePostController
);

//Delete posts.
router.delete(
    '/:postId',
    authUserMiddleware,
    postExistsMiddleware,
    canEditPostMiddleware,
    deletePostController
);

export default router;
