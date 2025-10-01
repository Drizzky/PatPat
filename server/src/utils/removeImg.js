import path from 'path';
import fs from 'fs/promises';
import throwError from './throwError.js';

const removeImgUtil = async (imgName) => {
  const imgPath = path.join(process.cwd(), process.env.UPLOADS_DIR, imgName);
  try {
    await fs.unlink(imgPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.warn('File not found, skipping deletion:', imgName);
      return;
    }
    console.error(err);
    throwError('Cannot delete file', 500);
  }
};

export default removeImgUtil;
