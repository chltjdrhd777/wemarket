import { Router } from 'express';
import { register, login, logout, token_refresh, getUser } from 'controllers/userControl';
import { auth } from 'middleware/auth';
import { create_favoriteList, get_favoritList } from 'controllers/favoriteControl';
import { auth_admin } from 'middleware/auth_admin';

const router = Router();

router.route('/favoriteList').get(get_favoritList).post(auth, auth_admin, create_favoriteList);

export default router;
