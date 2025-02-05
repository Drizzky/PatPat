import path from 'path';
import fs from 'fs/promises';
import generateErrorUtil from './generateErrorUtil.js';

const removeImgUtil = async (imgName) => {
    try {
        const imgPath = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            imgName
        );
        try {
            await fs.access(imgPath);
        } catch {
            console.log('FILE NOT FOUND!');
            return;
        }
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        generateErrorUtil('Cannot delete file', 500);
    }
};

export default removeImgUtil;
