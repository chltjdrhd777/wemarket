import jwt from 'jsonwebtoken';

const user_related = {
    generateToken: (data: {}, secret: string, expire: string) => jwt.sign(data, secret, { expiresIn: expire }),
    token_verify: (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
};

export { user_related };
