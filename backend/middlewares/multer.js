import multer from 'multer';
import fs from 'fs';
import path from 'path';

const uploadDir = path.resolve('uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${safe}`);
  }
});

const upload = multer({ storage });

export default upload;
