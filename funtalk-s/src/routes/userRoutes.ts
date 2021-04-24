import { Router } from 'express';
import { register, token_refresh } from 'controllers/userControl';

const router = Router();

//get
router.get('/token_refresh', token_refresh);

//post
router.post('/register', register);

export default router;
