import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import fileUpload from 'express-fileupload';
import fileUploadConfig from './src/config/fileUpload.js';

import userRoutes from './src/routes/userRoutes.js';

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
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.httpStatus) {
    // Controlled error from throwError
    console.error('\x1b[33m%s\x1b[0m', err); // Yellow color for controlled errors
    res.status(err.httpStatus).send({ status: 'error', message: err.message });
  } else {
    // Uncontrolled error
    console.error('\x1b[31m%s\x1b[0m', err); // Red color for uncontrolled errors
    res.status(500).send({ status: 'error', message: 'Internal server error' });
  }
});

// 404 not found.
app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Path not found' });
});

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`));
