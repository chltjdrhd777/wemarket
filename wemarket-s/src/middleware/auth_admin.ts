import { CustomRequest } from './middleware.types';
import { NextFunction, Response } from 'express';
import User from 'models/userModel';

const auth_admin = async (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
        const target_user = (await User.findOne({ _id: req.user?.id }))!;

        if (target_user.role === 'user' || target_user.role !== process.env.ADMIN_CODE!) {
            return res.status(400).json({ msg: 'not admin, access denied' });
        }

        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export { auth_admin };
