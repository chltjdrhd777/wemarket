import { CustomRequest } from './../middleware/middleware.types.d';
import Category from 'models/categoryModel';
import { Request, Response } from 'express';
import { commonly_used } from 'utilities';
import { CategoryType } from 'models/models.types';
import path from 'path';
import fs from 'fs';

const { errResponse } = commonly_used;

const uploadImages = (req: Request, res: Response) => {
    try {
        const files = req.files;
        const rootDir = path.join(path.dirname(__dirname));

        if (files.length === 0) {
            return res.status(400).json({ msg: 'not upload file or not valide fileType' });
        }

        fs.readdir(path.join(rootDir, 'upload'), (err, files) => {
            files.forEach((each) => {
                const filePath = path.join(rootDir, `upload/${each}`);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        return res.status(400).json('delete failed');
                    }

                    console.log('success');
                });
            });
        });

        res.json({ fileinfo: files });
    } catch (err) {
        errResponse(res, err);
    }
};

export { uploadImages };
