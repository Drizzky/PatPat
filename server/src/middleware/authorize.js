import jwt from 'jsonwebtoken';
import throwError from '../utils/throwError.js';

const authorize = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) throwError('Missing Authorization header', 401);

    // Remove "Bearer " prefix if present
    const token = authorization.startsWith('Bearer ') ? authorization.slice(7).trim() : authorization.trim();

    let tokenInfo;
    try {
      tokenInfo = jwt.verify(token, process.env.SECRET);
    } catch (err) {
      console.error('\x1b[31m%s\x1b[0m', err); // Red for uncontrolled errors
      throwError('Invalid token', 403);
    }

    req.user = { id: tokenInfo.id, role: tokenInfo.role };
    next();
  } catch (err) {
    next(err);
  }
};

export default authorize;
