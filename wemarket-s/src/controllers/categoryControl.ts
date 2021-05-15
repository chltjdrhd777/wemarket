import { CustomRequest } from './../middleware/middleware.types.d';
import Category from 'models/categoryModel';
import { Request, Response } from 'express';
import { commonly_used } from 'utilities';
import { CategoryType } from 'models/models.types';

const { errResponse } = commonly_used;

const getCategories = async (req: Request, res: Response) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        errResponse(res, err);
    }
};

const createCategory = async (req: CustomRequest<{}, {}, CategoryType>, res: Response) => {
    try {
        const { name } = req.body;
        const category = await Category.findOne({ name });
        if (category) {
            return res.status(400).json({ msg: 'already exist category' });
        }

        const newCategory = new Category({ name });
        await newCategory.save();
        res.json({ msg: 'creation success' });
    } catch (err) {
        errResponse(res, err);
    }
};

const deleteCategory = async (req: CustomRequest<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
        await Category.findOneAndDelete({ _id: id });
        res.json({ msg: 'deleted' });
    } catch (err) {
        errResponse(res, err);
    }
};

const updateCategory = async (
    req: CustomRequest<{ id: string }, {}, CategoryType>,
    res: Response
) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        await Category.findOneAndUpdate({ _id: id }, { name });

        res.json({ msg: 'updated' });
    } catch (err) {
        errResponse(res, err);
    }
};

export { getCategories, createCategory, deleteCategory, updateCategory };
