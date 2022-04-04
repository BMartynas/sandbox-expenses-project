import express from 'express';
import * as authController from '../controllers/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;
