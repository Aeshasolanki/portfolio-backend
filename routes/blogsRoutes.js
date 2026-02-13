import express from "express";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../controllers/blogsController.js";
import { uploadBlog } from "../middleware/uploadBlog.js";

const router = express.Router();

// Request inspector middleware for debugging: logs content-type and presence of file
const inspectRequest = (req, res, next) => {
	try {
		console.log("[blogsRoutes] Incoming:", req.method, req.originalUrl, "content-type=", req.headers["content-type"]);
		next();
	} catch (e) {
		next();
	}
};

// All CRUD routes
router.get("/", getBlogs);
router.post("/", inspectRequest, uploadBlog.single("image"), createBlog);
router.put("/:id", inspectRequest, uploadBlog.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

export default router;
