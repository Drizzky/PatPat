import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import errorHandler from '../../utils/errorHandler.js';
import { findUserByEmail } from '../../models/users.js';

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw errorHandler({ httpStatus: 400, message: 'Faltan campos.' }, req, res);

    const user = await findUserByEmail(email);
    if (!user) throw errorHandler({ httpStatus: 404, message: 'No existe un usuario con ese email y/o password' }, req, res);

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw errorHandler({ httpStatus: 403, message: 'No existe un usuario con ese email y/o password' }, req, res);

    if (!user.isVerified) throw errorHandler({ httpStatus: 403, message: 'Verifique su cuenta poder acceder a nuestros servicios' }, req, res);

    if (user.isBanned) throw errorHandler({ httpStatus: 403, message: 'Su cuenta ha sido banneada temporalmente para más imformacion mandenos un correo a arcademarket@gmail.com' }, req, res);

    // TODO comprobar users_log para evitar intentos fallidos repetidos

    const tokenInfo = {
      id: user.id,
      role: user.role,
    };

    const token = jwt.sign(tokenInfo, process.env.SECRET, { expiresIn: '7d' });

    res.status(200);
    res.send({
      status: 'ok',
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export default loginUser;
