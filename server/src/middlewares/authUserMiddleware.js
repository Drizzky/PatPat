import jwt from 'jsonwebtoken';
import generateErrorUtil from '../utils/generateErrorUtil.js';

const authUserMiddleware = async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            generateErrorUtil('The Authorization header is missing', 401);
        }

        try {
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);

            req.user = {
                id: tokenInfo.id,
                role: tokenInfo.role,
            };

            next();
        } catch (err) {
            console.error(err);
            generateErrorUtil('Invalid token', 403);
        }
    } catch (err) {
        next(err);
    }
};

export default authUserMiddleware;
