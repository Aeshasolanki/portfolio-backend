// backend-api/controllers/blogsController.js
import { pool } from "../db.js";

// GET all blogs
export const getBlogs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(result.rows); // always send an array
  } catch (err) {
    console.error("GET BLOGS ERROR:", err);
    res.status(500).json({ message: "Server error while fetching blogs" });
  }
};

// CREATE blog
export const createBlog = async (req, res) => {
  try {
    let { title, slug, short_description, content, author_name, category, tags, status } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: "Title, slug and content are required" });
    }

    if (Array.isArray(tags)) tags = JSON.stringify(tags);
    else tags = JSON.stringify([]);

    const result = await pool.query(
      `INSERT INTO blogs 
      (title, slug, short_description, content, author_name, category, tags, status)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [title, slug, short_description, content, author_name, category, tags, status]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("CREATE BLOG ERROR:", err);
    res.status(500).json({ message: "Server error while creating blog", error: err.message });
  }
};

// DELETE blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM blogs WHERE id=$1", [id]);
    res.json({ message: "Blog deleted" });
  } catch (err) {
    console.error("DELETE BLOG ERROR:", err);
    res.status(500).json({ message: "Server error while deleting blog", error: err.message });
  }
};
