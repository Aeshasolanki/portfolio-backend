import express from "express";
import * as controller from "../controllers/blogsController.js";

const router = express.Router();

router.get("/", controller.getBlogs);
router.post("/", controller.createBlog);
router.delete("/:id", controller.deleteBlog);

export default router;
