import express from 'express';
import analyticsController from '../controller/analyticsController.js';

const router = express.Router();

router.post('/', analyticsController);

export default router;
