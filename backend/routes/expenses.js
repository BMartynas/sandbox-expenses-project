import express from 'express';
import * as expensesController from '../controllers/expenses.js';

const router = express.Router();

router.get('/', expensesController.getAll);
router.get('/:id', expensesController.getOne);
router.post('/', expensesController.create);
router.put('/:id', expensesController.update);
router.delete('/:id', expensesController.remove);

export default router;
