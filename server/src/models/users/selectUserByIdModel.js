import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

const selectUserByIdModel = async (userId) => {
    const pool = await getPool();
    const [users] = await pool.query(
        `SELECT id, username, email, avatar, role, createdAt FROM users WHERE id = ?`,
        [userId]
    );

    if (users.length < 1) {
        generateErrorUtil('User not found', 404);
    }
    return users[0];
};

export default selectUserByIdModel;
