import { UserDocType } from 'models/models.types.d';
import { Request, Response } from 'express';
import User from 'models/userModel';
import { Register_Request, Verified_userData } from 'controllers/userCtr.types';
import bcrypt from 'bcrypt';
import { user_related } from 'utilities';

const { generateToken_access, generateToken_refersh, verifyToken_refresh } = user_related;

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

        const token_access = generateToken_access({ id: newUser._id, name: newUser.name });
        const token_refresh = generateToken_refersh({ id: newUser._id, name: newUser.name });

        //6. attach token_refresh to client
        res.cookie('token_refresh', token_refresh, { httpOnly: true, path: '/user/token_refresh', secure: true });
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
        const verification = verifyToken_refresh(tokenRefresh_from_client) as Verified_userData;
        if (verification) {
            const token_access = generateToken_access({ id: verification.id, name: verification.name });
            res.json({ token_access });
        }
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};

export { register, token_refresh };
