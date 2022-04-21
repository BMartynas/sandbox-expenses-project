import express from 'express';
import * as currenciesController from '../controllers/currencies.js';

const router = express.Router();

router.get('/', currenciesController.getAll);

export default router;
