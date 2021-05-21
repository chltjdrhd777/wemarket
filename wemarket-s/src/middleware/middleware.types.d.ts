import { Verified_userData } from 'controllers/controllers.types';
import { Request } from 'express';

export interface CustomRequest<P = {}, Q = {}, T = {}, R = {}> extends Request<P, Q, T, R> {
    user?: Verified_userData;
}
