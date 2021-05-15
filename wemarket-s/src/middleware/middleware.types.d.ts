import { Verified_userData } from 'controllers/controllers.types';
import { Request } from 'express';

export interface FavoriteList_docType {
    name: string;
}

export interface CustomRequest<P = {}, Q = {}, T = {}> extends Request<P, Q, T> {
    user?: Verified_userData;
}
