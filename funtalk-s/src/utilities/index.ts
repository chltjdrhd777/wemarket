import jwt from 'jsonwebtoken';

const user_related = {
    generateToken_access: (data: {}) => jwt.sign(data, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' }),
    generateToken_refersh: (data: {}) => jwt.sign(data, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '10d' }),
    verifyToken_access: (token: string) => jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string),
    verifyToken_refresh: (token: string) => jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string)
};

export { user_related };
