import jwt from 'jsonwebtoken';
import throwError from '../utils/throwError.js';

const authorize = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return next(throwError('Missing Authorization header', 401));
    }

    // Remove "Bearer " prefix if present
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : authorization.trim();

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.error(err);
      return next(throwError('Invalid token', 403));
    }

    req.user = { userId: tokenInfo.id, role: tokenInfo.role };
    next();
  } catch (err) {
    next(err);
  }
};

export default authorize;
