import multer from "multer";
import path from "path";

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePrefix}_${file.originalname}`;
    console.log(filename);
    cb(null, filename);
  },
});

export const upload = multer({ storage: multerConfig });
