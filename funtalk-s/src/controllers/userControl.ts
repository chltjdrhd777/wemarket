import { UserDocType } from 'models/models.types.d';
import { Request, Response } from 'express';
import User from 'models/userModel';
import { User_Request, Verified_userData } from 'controllers/userCtr.types';
import bcrypt from 'bcrypt';
import { user_related } from 'utilities';

const { generateToken_access, generateToken_refersh, verifyToken_refresh } = user_related;

const register = async (req: User_Request, res: Response) => {
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

        const token_access = generateToken_access({ id: newUser._id, name: newUser.name });
        const token_refresh = generateToken_refersh({ id: newUser._id, name: newUser.name });

        //6. attach token_refresh to client
        res.cookie('token_refresh', token_refresh, { httpOnly: true, path: '/user/token_refresh', secure: true });
        res.json({ token_access });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

const login = async (req: User_Request, res: Response) => {
    try {
        //1. get user email & passowrd
        const { email, password } = req.body;

        //2. user find
        const target_user = await User.findOne({ email });
        if (!target_user) return res.status(400).json({ msg: 'there is no user' });

        //3. password encoding
        const isMatch = await bcrypt.compare(password, target_user.password);
        if (!isMatch) return res.status(400).json({ msg: 'wrong password' });

        //4. permission => send tokens
        const token_access = generateToken_access({ id: target_user._id, name: target_user.name });
        const token_refresh = generateToken_refersh({ id: target_user._id, name: target_user.name });
        res.cookie('token_refresh', token_refresh, { httpOnly: true, path: '/user/token_refresh', secure: true });
        res.json({ token_access });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

const token_refresh = (req: Request, res: Response) => {
    try {
        //1. get user token_refresh
        const tokenRefresh_from_client = req.cookies.token_refresh;

        //2. if there isn't token_refresh
        if (!tokenRefresh_from_client) return res.status(400).json({ msg: 'please log in or register' });

        //3. token verification
        const verification = verifyToken_refresh(tokenRefresh_from_client) as Verified_userData;
        if (verification) {
            const token_access = generateToken_access({ id: verification.id, name: verification.name });
            res.json({ token_access });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export { register, token_refresh, login };
