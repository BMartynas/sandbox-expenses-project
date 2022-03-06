import express from 'express';
import * as incomeController from '../controllers/income.js';

const router = express.Router();

router.get('/', incomeController.getAll);
router.get('/:id', incomeController.getOne);
router.post('/', incomeController.create);
router.put('/:id', incomeController.update);
router.delete('/:id', incomeController.remove);

export default router;
