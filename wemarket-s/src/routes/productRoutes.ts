import { Router } from 'express';
import { auth } from 'middleware/auth';
import { auth_admin } from 'middleware/auth_admin';
import {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
} from 'controllers/productControl';

const router = Router();

//get

//post

//router.route
router.route('/products').get(getProducts).post(createProduct);
router.route('product/:id').delete(deleteProduct).put(updateProduct);

export default router;
