import express from 'express';
import { addWeight, getWeightHistory } from '../controller/weightController.js';

const router = express.Router();

router.post('/weight/add', addWeight);
router.post('/weight/history', getWeightHistory);

export default router;
