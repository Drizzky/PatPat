import jwt from 'jsonwebtoken';
import errorHandler from './src/utils/errorHandler.js';

const authUserMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return next(errorHandler({ httpStatus: 401, message: 'Missing Authorization Headers' }, req, res));

    try {
      //Desencriptamos la información del token
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);

      req.user = { idUser: tokenInfo.id, role: tokenInfo.role };
      next();
    } catch (err) {
      console.error(err);
      next(errorHandler({ httpStatus: 403, message: 'Invalid token' }, req, res));
    }
  } catch (err) {
    next(err);
  }
};

export default authUserMiddleware;
