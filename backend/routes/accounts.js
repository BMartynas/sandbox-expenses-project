import express from 'express';
import * as accountsController from '../controllers/accounts.js';

const router = express.Router();

router.get('/', accountsController.getAll);
router.get('/:id', accountsController.getOne);
router.post('/', accountsController.create);
router.put('/:id', accountsController.update);
router.delete('/:id', accountsController.remove);

export default router;
