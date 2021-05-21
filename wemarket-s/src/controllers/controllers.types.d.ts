import { Request } from 'express';
import { User_DocType } from 'models/models.types';

export interface User_Request extends Request<{}, {}, User_DocType> {}

export interface Verified_userData {
    id: string;
    name: string;
    iat: number;
    exp: number;
}

export interface ImageInfo {
    name: string;
}

export interface ProductQueryString {
    [key: string]: string;
    productId: string;
    page: string;
    sort: string;
    limit: string;
}
