import express from 'express';
import * as usersController from '../controllers/users.js';

const router = express.Router();

router.post('/register', usersController.create);

export default router;
