import express from 'express';
import analyticsController from '../controller/analyticsController.js';

const router = express.Router();

router.post('/workouts/stats', analyticsController);

export default router;
