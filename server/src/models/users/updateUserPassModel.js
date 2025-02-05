import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const updateUserPassModel = async (password, recoverPassCode) => {
    const pool = await getPool();
    const [users] = await pool.query(
        `SELECT id FROM users WHERE recoverPassCode = ?`,
        [recoverPassCode]
    );
    console.log(recoverPassCode);
    if (users.length < 1) {
        generateErrorUtil('Incorect recovery code', 404);
    }

    const hashedPass = await bcrypt.hash(password, 10);
    await pool.query(
        `UPDATE users SET password = ?, recoverPassCode = null WHERE recoverPassCode = ?`,
        [hashedPass, recoverPassCode]
    );
};

export default updateUserPassModel;
