import multer from 'multer';

export const upload = (options: multer.Options): multer.Multer => multer(options);
