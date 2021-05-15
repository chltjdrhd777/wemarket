import { auth_admin } from 'middleware/auth_admin';
import { auth } from 'middleware/auth';
import { Router } from 'express';
import { uploadImages } from 'controllers/uploadControl';

const router = Router();

router.post('/upload', auth, auth_admin, uploadImages);

export default router;
