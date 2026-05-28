import express from 'express';
import { getPosts, toggleFistBump } from '../controller/postController.js';

const router = express.Namespace ? express.Namespace : express.Router();

router.get('/feed', getPosts);
router.post('/fistbump', toggleFistBump);

export default router;
