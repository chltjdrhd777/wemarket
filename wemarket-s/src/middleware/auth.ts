import { Verified_userData } from 'controllers/controllers.types';
import { user_related } from 'utilities';
import { NextFunction, Response, Request } from 'express';
import { CustomRequest } from './middleware.types';
const { verifyToken_access } = user_related;

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const token_access = req.header('Authorization');

        if (!token_access) return res.status(400).json({ msg: "Invalid:don't have token_access" });

        const verification_token_access = verifyToken_access(token_access) as Verified_userData;

        req.user = verification_token_access;

        next();
    } catch (err) {
        return res.status(500).json({ mgs: err.message });
    }
};

export { auth };
