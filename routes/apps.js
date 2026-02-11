import express from "express";
import multer from "multer";
import * as controller from "../controllers/appsController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", controller.getApps);
router.post("/", upload.single("icon"), controller.createApp);
router.put("/:id", controller.updateApp);
router.delete("/:id", controller.deleteApp);

export default router;
