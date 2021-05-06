import { Router } from 'express';
import { auth } from 'middleware/auth';
import {
    create_favoriteList,
    delete_favoriteList,
    get_favoritList,
    update_favoriteList,
    upload_favoriteIMGs
} from 'controllers/favoriteControl';
import { auth_admin } from 'middleware/auth_admin';
import { upload } from 'middleware/multer';
import multer from 'multer';
import path from 'path';

//////////////////////////////////////////////////////
const router = Router();

//note : if you don't define "storage" property,
//multer understands that you want to use buffer. take note
const multer_options: multer.Options = {
    limits: {
        fileSize: 1 * 1024 * 1024,
        files: 3
    }
};

//post
router.post(
    '/upload',
    auth,
    auth_admin,
    upload(multer_options).array('favorite_imgs'),
    upload_favoriteIMGs
);

//router.route
router.route('/favoriteList').get(get_favoritList).post(auth, auth_admin, create_favoriteList);

router
    .route('/favoriteList/:id')
    .delete(auth, auth_admin, delete_favoriteList)
    .patch(auth, auth_admin, update_favoriteList);

export default router;
