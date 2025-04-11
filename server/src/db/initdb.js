import getPool from './getPool.js';
import { readFileSync } from 'fs';

const scriptDB = readFileSync('./src/db/scriptDB.sql', 'utf-8');

const main = async () => {
    try {
        const pool = await getPool();

        console.log('Creando tablas...');

        await pool.query(scriptDB);

        console.log(`✅ Database initialized successfully.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error initializing database:', error);
        process.exit(1);
    }
};

main();
