import express from 'express';
import { addWeight, getWeightHistory } from '../controller/weightController.js';

const router = express.Router();

router.post('/add', addWeight);
router.post('/history', getWeightHistory);

export default router;
