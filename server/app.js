import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';
import fileUpload from 'express-fileupload';
import fileUploadConfig from './src/config/fileUpload.js';

import userRoutes from './src/routes/userRoutes.js';
import petRoutes from './src/routes/petRoutes.js';
import snapRoutes from './src/routes/snapRoutes.js';

const { PORT, UPLOADS_DIR } = process.env;

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(fileUpload(fileUploadConfig));
app.use(express.json());

// Static Files
app.use(express.static(UPLOADS_DIR));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/snaps', snapRoutes);

// Errors
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = Number.isInteger(err.httpStatus) ? err.httpStatus : 500;

  if (statusCode !== 500) {
    console.error('\x1b[33m%s\x1b[0m', err); // Yellow for controlled errors
    res.status(statusCode).json({ status: 'error', message: err.message });
  } else {
    console.error('\x1b[31m%s\x1b[0m', err); // Red for uncontrolled errors
    res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
});

// 404 not found.
app.use((req, res) => {
  res.status(404).send({ status: 'error', message: 'Path not found' });
});

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`));
