import { D_UserDocType } from './../models/models.types.d';
import { Custom_Request } from './middleware.types.d';
import { NextFunction, Response } from 'express';
import User from 'models/userModel';

const auth_admin = async (req: Custom_Request, res: Response, next: NextFunction) => {
    try {
        //1. find user by id && check the role
        const target_user = (await User.findOne({ _id: req.user?.id }))!;
        //default user's role = "user"
        //if user's role is "user" or it is not admin code, throw 400
        if (target_user.role === 'user' || target_user.role !== process.env.ADMIN_CODE!)
            return res.status(400).json({ msg: 'not admin, access denied' });

        next();
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export { auth_admin };
