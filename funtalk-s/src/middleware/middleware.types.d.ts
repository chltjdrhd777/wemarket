import { Verified_userData } from 'controllers/controllers.types';
import { Request } from 'express';

export interface FavoriteList_docType {
    name: string;
}

export interface Custom_Request<T = {}> extends Request<{}, {}, T> {
    user?: Verified_userData;
}
