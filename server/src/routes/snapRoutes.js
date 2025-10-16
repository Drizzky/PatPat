import express from 'express';
import authorize from '../middleware/authorize.js';
import postSnap from '../controllers/snaps/postSnap.js';
import getSnaps from '../controllers/snaps/getSnaps.js';

// Router
const router = express.Router();

// Post snap
router.post('/', authorize, postSnap);

// List snaps
router.get('/', authorize, getSnaps);

// Get snap
// router.get('/:idSnap', authorize, getSnaps);

export default router;
