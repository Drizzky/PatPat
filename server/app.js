import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import fileUpload from 'express-fileupload';
import fileUploadConfig from './src/config/fileUpload.js';

import userRoutes from './src/routes/userRoutes.js';

import errorHandler from './src/utils/errorHandler.js';
import notFoundHandler from './src/utils/errorHandler.js';

const { PORT, UPLOADS_DIR } = process.env;

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(fileUpload(fileUploadConfig));

// Static Files
app.use(express.static(UPLOADS_DIR));

// Routes
app.use('/api/users', userRoutes);

// Errors
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`));
