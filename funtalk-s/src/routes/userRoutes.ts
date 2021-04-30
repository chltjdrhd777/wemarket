import { Router } from 'express';
import { login, register, token_refresh } from 'controllers/userControl';

const router = Router();

//get
router.get('/token_refresh', token_refresh);

//post
router.post('/register', register);
router.post('/login', login);

export default router;
