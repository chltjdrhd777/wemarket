import { ProductType, productTypeDocument } from './models.types.d';
import mongoose, { Model, SchemaTypeOptions } from 'mongoose';

const productSchemaOptions: { [key in keyof ProductType]: SchemaTypeOptions<any> } = {
    productId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    images: { type: Array },
    category: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    sold: {
        type: Number,
        default: 0
    }
};

const productSchema = new mongoose.Schema<productTypeDocument, Model<productTypeDocument>>(
    productSchemaOptions,
    {
        timestamps: true
    }
);

export default mongoose.model('Product', productSchema);
