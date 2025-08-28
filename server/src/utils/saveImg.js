import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import throwError from './throwError.js';
import crypto from 'crypto';

const saveImg = async (img, type = 'post', width = 800) => {
  try {
    const uploadsPath = path.join(process.cwd(), process.env.UPLOADS_DIR);

    try {
      await fs.access(uploadsPath);
    } catch {
      await fs.mkdir(uploadsPath);
    }

    const imgName = `${crypto.randomUUID()}.jpeg`;
    const imgPath = path.join(uploadsPath, imgName);

    const sharpImg = sharp(img.data);

    switch (type) {
      case 'banner':
        await sharpImg.resize(1200, 400, { fit: 'cover' }).jpeg({ quality: 80 }).toFile(imgPath);
        break;

      case 'post':
      default:
        await sharpImg.resize(width, null, { fit: 'inside' }).jpeg({ quality: 80 }).toFile(imgPath);
    }

    return imgName;
  } catch (err) {
    console.error(err);
    throw throwError('Could not save file.', 500);
  }
};

export default saveImg;
