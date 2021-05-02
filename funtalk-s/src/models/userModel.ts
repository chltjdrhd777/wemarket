import mongoose, { Model, SchemaTypeOptions } from 'mongoose';
import { D_UserDocType } from 'models/models.types';

const user_schemaType: { [key: string]: SchemaTypeOptions<unknown> } = {
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
        type: String,
        default: 'user'
    },
    favoritList: {
        type: Array,
        default: []
    }
};

const user_schema = new mongoose.Schema<D_UserDocType, Model<D_UserDocType>>(user_schemaType, { timestamps: true });

export default mongoose.model('User', user_schema);
