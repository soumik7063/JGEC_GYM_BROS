import express from 'express';
import { createTemplate, deleteTemplate } from '../controller/templateController.js';

const templateRouter = express.Router();

templateRouter.post('/template', createTemplate);
templateRouter.delete('/template', deleteTemplate);

export default templateRouter;
