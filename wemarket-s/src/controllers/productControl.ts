import Product from 'models/productModel';
import { commonly_used } from 'utilities';
import { Request, Response } from 'express';
import { CustomRequest } from 'middleware/middleware.types';
import { ProductType } from 'models/models.types';

const { errResponse } = commonly_used;

const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json({ msg: products });
    } catch (err) {
        errResponse(res, err);
    }
};

const createProduct = async (req: CustomRequest<{}, {}, ProductType>, res: Response) => {
    try {
        const { productId, title, price, description, content, images, category } = req.body;
        if (!images) return res.status(400).json({ msg: 'no image' });

        const product = await Product.findOne({ productId });
        if (product) return res.status(400).json({ msg: 'already exist' });

        const newProduct = new Product({
            productId,
            title,
            price,
            description,
            content,
            images,
            category
        });

        await newProduct.save();
        res.json(newProduct);
    } catch (err) {
        errResponse(res, err);
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
    } catch (err) {
        errResponse(res, err);
    }
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
    } catch (err) {
        errResponse(res, err);
    }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
