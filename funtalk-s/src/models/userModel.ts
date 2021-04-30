import mongoose, { Model, SchemaTypeOptions } from 'mongoose';
import { D_UserDocType } from 'models/models.types';

const userSchema = new mongoose.Schema<D_UserDocType, Model<D_UserDocType>>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        },
        favoritList: {
            type: Array,
            default: []
        }
    } as { [key: string]: SchemaTypeOptions<unknown> },
    {
        timestamps: true
    }
);

export default mongoose.model('User', userSchema);
