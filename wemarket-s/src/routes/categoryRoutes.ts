import {
    createCategory,
    getCategories,
    deleteCategory,
    updateCategory
} from 'controllers/categoryControl';
import { Router } from 'express';
import { auth } from 'middleware/auth';
import { auth_admin } from 'middleware/auth_admin';

const router = Router();

//get

//post

//router.route
router.route('/category').get(getCategories).post(auth, auth_admin, createCategory);
router
    .route('/category/:id')
    .delete(auth, auth_admin, deleteCategory)
    .patch(auth, auth_admin, updateCategory);

export default router;
