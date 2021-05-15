import { CategoryDoctype } from './models.types.d';
import mongoose, { Model, SchemaTypeOptions } from 'mongoose';

const categorySchemaOptions: { [key: string]: SchemaTypeOptions<unknown> } = {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
};

const categorySchema = new mongoose.Schema<CategoryDoctype, Model<CategoryDoctype>>(
    categorySchemaOptions,
    {
        timestamps: true
    }
);

export default mongoose.model('Category', categorySchema);
