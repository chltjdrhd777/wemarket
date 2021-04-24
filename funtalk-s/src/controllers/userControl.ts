import { UserDocType } from './../models/models.types.d';
import { Request, Response, NextFunction } from 'express';
import User from 'models/userModel';
import { Register_Request, Verified_userData } from './userCtr.types';
import bcrypt from 'bcrypt';
import { user_related } from 'utilities';

const { generateToken, token_verify } = user_related;

const register = async (req: Register_Request, res: Response) => {
    try {
        const { name, email, password } = req.body;

        //1. find whether exist or not
        const userFind = await User.findOne({ email });
        if (userFind) return res.status(400).json({ msg: 'exist' });

        //2. password length
        if (password.length < 6) return res.status(400).json({ msg: '[Password] : short(less than 6)' });

        //3. password incoding
        const password_hash = await bcrypt.hash(password, 10);

        //4. user enrollment
        const newUser = new User({
            name,
            email,
            password: password_hash
        } as UserDocType);

        await newUser.save();

        //5. generate token for strong authentification
        const token_access = generateToken({ id: newUser._id, name: newUser.name }, process.env.ACCESS_TOKEN_SECRET as string, '1h');
        const token_refresh = generateToken({ id: newUser._id, name: newUser.name }, process.env.REFRESH_TOKEN_SECRET as string, '10d');

        //6. attach token_refresh to client
        res.cookie('token_refresh', token_refresh, { httpOnly: true, path: '/user/token_refresh' });
        res.json({ token_access });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const token_refresh = (req: Request, res: Response) => {
    try {
        //1. get user token_refresh
        const tokenRefresh_from_client = req.cookies.token_refresh;

        //2. if there isn't token_refresh
        if (!tokenRefresh_from_client) return res.status(400).json({ msg: 'please log in or register' });

        //3. token verification
        const verification = token_verify(tokenRefresh_from_client) as Verified_userData;
        if (verification) {
            const token_access = generateToken({ id: verification.id, name: verification.name }, process.env.ACCESS_TOKEN_SECRET as string, '1h');
            res.json({ token_access });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export { register, token_refresh };
