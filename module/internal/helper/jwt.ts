import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY ? process.env.SECRET_KEY : "secret-access-AF1222";

export const generateToken = (payload: any) => {
    return jwt.sign(payload, SECRET_KEY);
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY);
}