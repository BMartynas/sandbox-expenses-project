import express from 'express';
import * as transactionsController from '../controllers/transactions.js';

const router = express.Router();

router.get('/account/:accountId', transactionsController.getAll);
router.get('/:id', transactionsController.getOne);
router.post('/:accountId', transactionsController.create);
router.put('/:id', transactionsController.update);
router.delete('/:id', transactionsController.remove);

export default router;
