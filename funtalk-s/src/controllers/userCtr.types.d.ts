import { Request, Response, NextFunction } from 'express';
import { UserDocType } from 'models/models.types';

export interface User_Request extends Request<{}, {}, UserDocType> {}

export interface Verified_userData {
    id: string;
    name: string;
    iat: number;
    exp: number;
}
