import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';
import generateErrorUtil from './generateErrorUtil.js';
import crypto from 'crypto';

const saveImgUtil = async (img, width = 800, isAvatar = false) => {
    try {
        const uploadsPath = path.join(process.cwd(), process.env.UPLOADS_DIR);

        try {
            await fs.access(uploadsPath);
        } catch {
            await fs.mkdir(uploadsPath);
        }

        const imgName = `${crypto.randomUUID()}.png`;
        const imgPath = path.join(uploadsPath, imgName);

        const sharpImg = sharp(img.data);

        if (isAvatar) {
            // Resize for avatars: make it square (e.g., 200x200px)
            await sharpImg
                .resize(200, 200) // Square size for avatar
                .jpeg({ quality: 80 }) // Optional: Convert to JPEG for smaller size
                .toFile(imgPath);
        } else {
            // Resize for posts: Maintain aspect ratio
            await sharpImg
                .resize(width, null) // Resize to width while maintaining aspect ratio
                .jpeg({ quality: 80 }) // Optional: Convert to JPEG for smaller size
                .toFile(imgPath);
        }

        return imgName;
    } catch (err) {
        console.error(err);
        throw generateErrorUtil('Cannot save file', 500);
    }
};

export default saveImgUtil;
