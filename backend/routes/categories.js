import express from 'express';
import * as categoriesController from '../controllers/categories.js';

const router = express.Router();

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getOne);
router.post('/', categoriesController.create);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.remove);

export default router;
