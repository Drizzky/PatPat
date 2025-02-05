import crypto from 'crypto';
import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';
import sendMailUtil from '../../utils/sendMailUtil.js';

const insertUserModel = async (username, email, password) => {
    const pool = await getPool();

    let [users] = await pool.query(`SELECT id FROM users WHERE username = ?`, [
        username,
    ]);
    if (users.length > 0) {
        generateErrorUtil('Username already taken.', 409);
    }

    [users] = await pool.query(`SELECT id FROM users WHERE email = ?`, [email]);
    if (users.length > 0) {
        generateErrorUtil('Email already in use.');
    }

    const regCode = crypto.randomBytes(15).toString('hex');
    const hashedPass = await bcrypt.hash(password, 10);
    const now = new Date();

    await pool.query(
        `
        INSERT INTO users (username, email, password, regCode, createdAt) VALUES (?, ?, ?, ?, ?)
        `,
        [username, email, hashedPass, regCode, now]
    );

    const emailSubject = 'Activate your user for Pethub :)';
    const emailBody = `
    Welcome ${username}!

    Thanks for registering in Pethub. To activate your account, click the next link:
         ${process.env.CLIENT_URL}/users/validate/${regCode}`;

    await sendMailUtil(email, emailSubject, emailBody);
};

export default insertUserModel;
