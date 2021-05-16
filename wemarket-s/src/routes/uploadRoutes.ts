import { auth_admin } from 'middleware/auth_admin';
import { auth } from 'middleware/auth';
import { Router } from 'express';
import { uploadImages } from 'controllers/uploadControl';
import { upload } from 'middleware/multer';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';

const multerOptions: multer.Options = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(path.dirname(__dirname), 'upload'));
        },
        filename: (req, file, cb) => {
            cb(null, `${uuid()}-${file.originalname}`);
        }
    }),
    limits: {
        fileSize: 2 * 1024 * 1024,
        files: 5
    },
    fileFilter: (req, file, cb) => {
        const fileTypeExample = ['png', 'jpg', 'jpeg'];
        let filetype = file.mimetype.split('/')[1];

        if (!fileTypeExample.includes(filetype)) {
            cb(null, false);
        } else {
            cb(null, true);
        }
    }
};

const router = Router();

router.post('/upload', auth, auth_admin, upload(multerOptions).array('categoryImg'), uploadImages);

export default router;
