// why <d.ts> not <.ts> = because I don't want to corrupt the folder when the building process is finished
// I only want to use this as type definition so, d.ts is prefferable
// Normally, d.ts is used to define the js files which typescript doesn't understand

import { Document } from 'mongoose';

//1. User
export interface User_DocType {
    name: string;
    email: string;
    password: string;
    role?: number | string;
    favoritList?: [];
}

export interface D_UserDocType extends Document, User_DocType {}

//2. Category
export interface CategoryType {
    name: string;
}

export interface CategoryDoctype extends Document, CategoryType {}

//3. Product
export interface ProductType {
    productId: string;
    title: string;
    price: number;
    description: string;
    content: string;
    images: string[];
    checked: boolean;
    sold: number;
    category: string;
}

export interface productTypeDocument extends Document, ProductType {}
