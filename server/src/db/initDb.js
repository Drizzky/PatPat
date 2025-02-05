import 'dotenv/config';
import getPool from './getPool.js';

const main = async () => {
    try {
        const pool = await getPool();
        console.log('Deleting tables..');
        await pool.query(
            'DROP TABLE IF EXISTS comments, likes, posts, pets, users'
        );
        console.log('Creating tables...');

        await pool.query(
            `CREATE TABLE IF NOT EXISTS users(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                username VARCHAR(30) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                regCode CHAR(30),
                active BOOLEAN DEFAULT FALSE,
                recoverPassCode CHAR(30),
                role ENUM("admin", "normal") DEFAULT "normal",
                avatar VARCHAR(100),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`
        );

        await pool.query(
            `CREATE TABLE IF NOT EXISTS pets(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(50) NOT NULL,
                avatar VARCHAR(100),
                color VARCHAR(50),
                type VARCHAR(50),
                breed VARCHAR(50),
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id)
)`
        );

        await pool.query(
            `CREATE TABLE IF NOT EXISTS posts(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                petId INT UNSIGNED NOT NULL,
                image VARCHAR(255) NOT NULL,
                caption TINYTEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users (id),
                FOREIGN KEY (petId) REFERENCES pets (id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`
        );

        await pool.query(
            ` CREATE TABLE IF NOT EXISTS comments(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                postId INT UNSIGNED NOT NULL,
                content TINYTEXT NOT NULL,
                FOREIGN KEY (userId) REFERENCES users (id),
                FOREIGN KEY (postId) REFERENCES posts (id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
)`
        );

        await pool.query(
            `CREATE TABLE IF NOT EXISTS likes (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                postId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (postId) REFERENCES posts(id),
                UNIQUE(userId, postId)
);`
        );

        console.log('Tables created!');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

main();
