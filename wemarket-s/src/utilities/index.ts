import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { NativeError } from 'mongoose';
import fs from 'fs';
import path from 'path';
import { v4 as uuid } from 'uuid';

const rootDir = path.join(path.dirname(__dirname));

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

const uploadingImage = {
    cleanUploadFolder: (res: Response) => {
        fs.readdir(path.join(rootDir, 'upload'), (err, files) => {
            files.forEach((each) => {
                const filePath = path.join(rootDir, `upload/${each}`);

                fs.unlink(filePath, (err) => {
                    if (err) {
                        return res.status(400).json('delete failed');
                    }

                    console.log('success');
                });
            });
        });
    }
};

export { user_related, commonly_used, rootDir, uploadingImage };
