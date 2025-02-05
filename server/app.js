import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import userRoutes from './src/routes/userRoutes.js';
import postRoutes from './src/routes/postRoutes.js';
import petRoutes from './src/routes/petRoutes.js';

const { PORT, UPLOADS_DIR } = process.env;

const app = express();

app.use(morgan('dev'));

app.use(cors());

app.use(express.static(UPLOADS_DIR));

app.use(express.json());

app.use(fileUpload());

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/pets', petRoutes);

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: '404',
    });
});

app.listen(PORT, () => {
    console.log(`Server listening in http://localhost:${PORT}`);
});
