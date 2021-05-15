import { CustomRequest } from './../middleware/middleware.types.d';
import Category from 'models/categoryModel';
import { Request, Response } from 'express';
import { commonly_used } from 'utilities';
import { CategoryType } from 'models/models.types';

const { errResponse } = commonly_used;

const uploadImages = (req: Request, res: Response) => {
    try {
        res.json({ fileInfo: req.files });
    } catch (err) {
        errResponse(res, err);
    }
};

export { uploadImages };
