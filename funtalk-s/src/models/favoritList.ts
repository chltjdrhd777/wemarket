import { D_FavoritList_Doctype } from './models.types.d';
import mongoose, { Model, SchemaTypeOptions } from 'mongoose';

const favoritList_schemaType: { [key: string]: SchemaTypeOptions<unknown> } = {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
};

const favoriteList_schema = new mongoose.Schema<D_FavoritList_Doctype, Model<D_FavoritList_Doctype>>(favoritList_schemaType, { timestamps: true });

export default mongoose.model('Favorite', favoriteList_schema);
