'use strict';

import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password'
});

const dbName = 'patpat';

try {
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  await connection.query(`USE \`${dbName}\`;`);

  const queries = [
    `CREATE TABLE IF NOT EXISTS HOUSE (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      banner TEXT,
      createdAt DATETIME,
      modifiedAt DATETIME,
      deletedAt DATETIME
    );`,

    `CREATE TABLE IF NOT EXISTS USERS (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idHouse INT,
      email VARCHAR(255),
      name VARCHAR(255),
      password VARCHAR(255),
      role VARCHAR(50),
      isVerified BOOLEAN DEFAULT FALSE,
      isBanned BOOLEAN DEFAULT FALSE,
      avatar TEXT,
      createdAt DATETIME,
      modifiedAt DATETIME,
      deletedAt DATETIME,
      FOREIGN KEY (idHouse) REFERENCES HOUSE(id)
    );`,

    `CREATE TABLE IF NOT EXISTS USERS_LOG (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idUser INT,
      date DATETIME,
      token VARCHAR(255),
      expiration DATETIME,
      state ENUM('email', 'ok'),
      FOREIGN KEY (idUser) REFERENCES USERS(id)
    );`,

    `CREATE TABLE IF NOT EXISTS PET_CATEGORIES (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    );`,

    `CREATE TABLE IF NOT EXISTS PET_COLORS (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255)
    );`,

    `CREATE TABLE IF NOT EXISTS PETS (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idHouse INT,
      name VARCHAR(255),
      avatar TEXT,
      idCategory INT,
      idColor INT,
      FOREIGN KEY (idHouse) REFERENCES HOUSE(id),
      FOREIGN KEY (idCategory) REFERENCES PET_CATEGORIES(id),
      FOREIGN KEY (idColor) REFERENCES PET_COLORS(id)
    );`,

    `CREATE TABLE IF NOT EXISTS TYPES (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      idParent INT,
      FOREIGN KEY (idParent) REFERENCES TYPES(id)
    );`,

    `CREATE TABLE IF NOT EXISTS PET_TYPES (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idPet INT,
      idType INT,
      FOREIGN KEY (idPet) REFERENCES PETS(id),
      FOREIGN KEY (idType) REFERENCES TYPES(id)
    );`,

    `CREATE TABLE IF NOT EXISTS PET_PALS (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idPet INT,
      idPal INT,
      becamePalsAt DATETIME,
      FOREIGN KEY (idPet) REFERENCES PETS(id),
      FOREIGN KEY (idPal) REFERENCES PETS(id)
    );`,

    `CREATE TABLE IF NOT EXISTS PatSnaps (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idPet INT,
      date DATETIME,
      caption TEXT,
      image TEXT,
      FOREIGN KEY (idPet) REFERENCES PETS(id)
    );`,

    `CREATE TABLE IF NOT EXISTS PATS (
      id INT AUTO_INCREMENT PRIMARY KEY,
      idPost INT,
      date DATETIME,
      FOREIGN KEY (idPost) REFERENCES PatSnaps(id)
    );`
  ];

  for (const query of queries) {
    await connection.query(query);
  }

  console.log(`✅ Database "${dbName}" initialized successfully.`);
} catch (error) {
  console.error('❌ Error initializing database:', error);
} finally {
  await connection.end();
}
