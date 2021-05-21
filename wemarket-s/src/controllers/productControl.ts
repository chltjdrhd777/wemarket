import Product from 'models/productModel';
import { commonly_used } from 'utilities';
import { Request, Response } from 'express';
import { CustomRequest } from 'middleware/middleware.types';
import { ProductType } from 'models/models.types';
import { ProductQueryString } from './controllers.types';

const { errResponse } = commonly_used;

//for resuing
class APIFeatures {
    query; //result of request
    queryString;
    constructor(query: any, queryString: { [key in keyof ProductQueryString]: string }) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach((each) => delete queryObj[each]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt}lt|lte|regex)\b/g, (match) => '$' + match);

        console.log(this.query.find((each: any) => each.price === JSON.parse(queryStr)).price);
        //console.log(this.query.find(JSON.parse(queryStr)));
        //return this;
    }
    sorting() {}
    paginating() {}
}

const getProducts = async (req: CustomRequest<{}, {}, {}, ProductQueryString>, res: Response) => {
    try {
        const features = new APIFeatures(await Product.find(), req.query).filtering();

        res.json({ msg: features });
    } catch (err) {
        errResponse(res, err);
    }
};

const createProduct = async (req: CustomRequest<{}, {}, ProductType>, res: Response) => {
    try {
        const { productId, title, price, description, content, images, category } = req.body;
        if (images.length === 0) return res.status(400).json({ msg: 'no image' });

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

const updateProduct = async (req: Request<{ id: string }, {}, ProductType>, res: Response) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, { title: req.body.title });
        res.json({ msg: 'work' });
    } catch (err) {
        errResponse(res, err);
    }
};

const deleteProduct = async (req: CustomRequest<{ id: string }>, res: Response) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ msg: 'successfully deleted' });
    } catch (err) {
        errResponse(res, err);
    }
};

export { getProducts, createProduct, updateProduct, deleteProduct };
