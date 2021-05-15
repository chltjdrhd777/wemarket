import { CustomRequest } from '../middleware/middleware.types';
import { User_DocType } from 'models/models.types.d';
import { Request, Response } from 'express';
import User from 'models/userModel';
import { User_Request, Verified_userData } from 'controllers/controllers.types';
import bcrypt from 'bcrypt';
import { commonly_used, user_related } from 'utilities';

const { generateToken_access, generateToken_refersh, verifyToken_refresh } = user_related;
const { errResponse } = commonly_used;

const register = async (req: User_Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        //1.
        const userFind = await User.findOne({ email });
        if (userFind) return res.status(400).json({ msg: 'exist' });

        //2.
        if (password.length < 6)
            return res.status(400).json({ msg: '[Password] : short(less than 6)' });

        //3.
        const password_hash = await bcrypt.hash(password, 10);

        //4.
        const newUser_data: User_DocType = {
            name,
            email,
            password: password_hash,
            role
        };
        const newUser = new User(newUser_data);

        await newUser.save();

        //5.
        const token_access = generateToken_access({ id: newUser._id, name: newUser.name });
        const token_refresh = generateToken_refersh({ id: newUser._id, name: newUser.name });

        //6.
        res.cookie('token_refresh', token_refresh, {
            httpOnly: true,
            path: '/user/token_refresh'
            // secure: true
        });
        res.json({ token_access });
    } catch (err) {
        errResponse(res, err);
    }
};

const login = async (req: User_Request, res: Response) => {
    try {
        //1.
        const { email, password } = req.body;

        //2.
        const target_user = await User.findOne({ email });
        if (!target_user) return res.status(400).json({ msg: 'there is no user' });

        //3.
        const isMatch = await bcrypt.compare(password, target_user.password);
        if (!isMatch) return res.status(400).json({ msg: 'wrong password' });

        //4.
        const token_access = generateToken_access({ id: target_user._id, name: target_user.name });
        const token_refresh = generateToken_refersh({
            id: target_user._id,
            name: target_user.name
        });

        res.cookie('token_refresh', token_refresh, {
            httpOnly: true,
            path: '/user/token_refresh'
            //secure:true
        });
        res.json({ token_access });
    } catch (err) {
        errResponse(res, err);
    }
};

const logout = (req: Request, res: Response) => {
    try {
        //1.
        res.clearCookie('token_refresh', { path: '/user/token_refresh' });
        return res.json({ msg: 'logged out' });
    } catch (err) {
        errResponse(res, err);
    }
};

const getUser = async (req: CustomRequest, res: Response) => {
    try {
        const target_user = await User.findById(req.user?.id).select('-password');
        if (!target_user) return res.status(400).json({ msg: 'no user' });

        res.json(target_user);
    } catch (err) {
        errResponse(res, err);
    }
};

const token_refresh = (req: Request, res: Response) => {
    try {
        //1.
        const token_refresh = req.cookies.token_refresh;

        //2.
        if (!token_refresh) return res.status(400).json({ msg: 'please log in or register' });

        //3.
        const verification_token_refresh = verifyToken_refresh(token_refresh) as Verified_userData;
        if (verification_token_refresh) {
            const token_access = generateToken_access({
                id: verification_token_refresh.id,
                name: verification_token_refresh.name
            });
            res.json({ token_access });
        }
    } catch (err) {
        errResponse(res, err);
    }
};

export { register, token_refresh, login, logout, getUser };
