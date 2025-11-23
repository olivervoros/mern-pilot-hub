import express from 'express';
const router = express.Router();
import { handleLogin } from '../controllers/AuthController.ts';

router.post('/', handleLogin);

export default router;
