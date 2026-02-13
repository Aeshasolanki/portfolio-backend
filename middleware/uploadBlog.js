// middleware/uploadBlog.js
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/blogs/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /^(image)\/(jpeg|jpg|png|webp|gif)$/i;
  if (allowed.test(file.mimetype)) cb(null, true);
  else cb(new Error("Only image files are allowed"), false);
};

export const uploadBlog = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
