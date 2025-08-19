import jwt from 'jsonwebtoken';
import throwError from '../utils/throwError.js';

const authorize = (req, res, next) => {
  try {
    const { authorization } = req.headers;
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    if (!authorization) return next(throwError('Missing Authorization Headers', 401));

    try {
      //Desencriptamos la información del token
      const tokenInfo = jwt.verify(authorization, process.env.SECRET);

      req.user = { idUser: tokenInfo.id, role: tokenInfo.role };
      next();
    } catch (err) {
      console.error(err);
      next(throwError('Invalid token', 403));
=======

    if (!authorization) {
      return next(throwError('Missing Authorization header', 401));
>>>>>>> Stashed changes
=======

    if (!authorization) {
      return next(throwError('Missing Authorization header', 401));
>>>>>>> Stashed changes
    }

    // Remove "Bearer " prefix if present
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : authorization.trim();

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.log(err);
      return next(throwError('Invalid token', 403));
    }

    req.user = { userId: tokenInfo.id, role: tokenInfo.role };
    next();
  } catch (err) {
    next(err);
  }
};

export default authorize;
