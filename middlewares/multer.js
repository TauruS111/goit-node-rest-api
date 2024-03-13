import multer from "multer";
import path from "path";

const tempDir = path.resolve("temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const { email } = req.user;
    const filename = `${email}_${file.originalname}`;
    console.log(filename);
    cb(null, filename);
  },
});

export const upload = multer({ storage: multerConfig });
