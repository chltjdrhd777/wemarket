import { Router } from 'express';
import { register, login, logout, token_refresh, getUser } from 'controllers/userControl';
import { auth } from 'middleware/auth';

const router = Router();

//get
router.get('/token_refresh', token_refresh);
router.get('/logout', logout);
router.get('/auth', auth);
router.get('/getUser', auth, getUser);

//post
router.post('/register', register);
router.post('/login', login);

export default router;
