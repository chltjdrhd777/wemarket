import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { NativeError } from 'mongoose';

const commonly_used = {
    errResponse: (res: Response, err: NativeError) => {
        return res.status(500).json({ msg: err.message });
    }
};

const user_related = {
    generateToken_access: (data: {}) =>
        jwt.sign(data, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1h' }),
    generateToken_refersh: (data: {}) =>
        jwt.sign(data, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '10d' }),
    verifyToken_access: (token: string) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!),
    verifyToken_refresh: (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!)
};

export { user_related, commonly_used };
