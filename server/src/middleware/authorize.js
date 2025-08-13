import jwt from 'jsonwebtoken';
import throwError from '../utils/throwError.js';

const authUserMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next(throwError('Missing Authorization Headers', 401));

    try {
      //Desencriptamos la información del token
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);

      req.user = { idUser: tokenInfo.id, role: tokenInfo.role };
      next();
    } catch (err) {
      console.error(err);
      next(throwError('Invalid token', 403));
    }
  } catch (err) {
    next(err);
  }
};

export default authUserMiddleware;
