import express from 'express';
import { addProteinLog, getProteinLogs } from '../controller/proteinController.js';

const router = express.Router();

router.post('/addprotein', addProteinLog);
router.post('/getprotein', getProteinLogs);

export default router;
