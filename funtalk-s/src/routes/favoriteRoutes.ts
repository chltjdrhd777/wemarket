import { Router } from 'express';
import { register, login, logout, token_refresh, getUser } from 'controllers/userControl';
import { auth } from 'middleware/auth';
import {
    create_favoriteList,
    delete_favoriteList,
    get_favoritList,
    update_favoriteList
} from 'controllers/favoriteControl';
import { auth_admin } from 'middleware/auth_admin';

const router = Router();

router.route('/favoriteList').get(get_favoritList).post(auth, auth_admin, create_favoriteList);

router
    .route('/favoriteList/:id')
    .delete(auth, auth_admin, delete_favoriteList)
    .patch(auth, auth_admin, update_favoriteList);

export default router;
