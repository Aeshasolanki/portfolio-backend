import { pool } from "../db.js";

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM blogs ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    console.error("GET BLOGS ERROR:", error);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Create blog
export const createBlog = async (req, res) => {
  try {
    // BULLETPROOF: destructure safely with || {} and use .get() for each field
    const body = req.body || {};
    const title = body.title ? String(body.title).trim() : "";
    const slug = body.slug ? String(body.slug).trim() : "";
    const short_description = body.short_description ? String(body.short_description).trim() : "";
    const content = body.content ? String(body.content).trim() : "";
    const author_name = body.author_name ? String(body.author_name).trim() : "";
    const category = body.category ? String(body.category).trim() : "";
    const status = body.status ? String(body.status).trim() : "published";

    // Validation
    if (!title || !slug || !content) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["title", "slug", "content"],
        received: { title: !!title, slug: !!slug, content: !!content }
      });
    }

    // Image URL from multer (if file uploaded)
    const imageUrl = req.file && req.file.filename
      ? `${req.protocol}://${req.get("host")}/uploads/blogs/${req.file.filename}`
      : null;

    console.log("[createBlog] title=%s slug=%s hasFile=%s hasImageUrl=%s", title, slug, !!req.file, !!imageUrl);

    // Try insert with image_url first
    let query = `
      INSERT INTO blogs
      (title, slug, short_description, content, author_name, category, status, image_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;
    let values = [title, slug, short_description, content, author_name, category, status, imageUrl];

    try {
      const result = await pool.query(query, values);
      return res.status(201).json(result.rows[0]);
    } catch (dbErr) {
      // If image_url column doesn't exist, try without it
      if (dbErr.message && /image_url|column/i.test(dbErr.message)) {
        console.warn("[createBlog] image_url column missing, retrying without it");
        const query2 = `
          INSERT INTO blogs
          (title, slug, short_description, content, author_name, category, status)
          VALUES ($1,$2,$3,$4,$5,$6,$7)
          RETURNING *;
        `;
        const values2 = [title, slug, short_description, content, author_name, category, status];
        try {
          const result2 = await pool.query(query2, values2);
          return res.status(201).json(result2.rows[0]);
        } catch (dbErr2) {
          console.error("[createBlog] fallback query failed:", dbErr2.message);
          return res.status(500).json({ error: "Database error", details: dbErr2.message });
        }
      }
      console.error("[createBlog] database error:", dbErr.message);
      return res.status(500).json({ error: "Database error", details: dbErr.message });
    }
  } catch (error) {
    console.error("[createBlog] unexpected error:", error.message, error.stack);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Missing blog id" });
    }

    // BULLETPROOF: destructure safely
    const body = req.body || {};
    const title = body.title ? String(body.title).trim() : "";
    const slug = body.slug ? String(body.slug).trim() : "";
    const short_description = body.short_description ? String(body.short_description).trim() : "";
    const content = body.content ? String(body.content).trim() : "";
    const author_name = body.author_name ? String(body.author_name).trim() : "";
    const category = body.category ? String(body.category).trim() : "";
    const status = body.status ? String(body.status).trim() : "published";

    // Validation
    if (!title || !slug || !content) {
      return res.status(400).json({
        error: "Missing required fields",
        required: ["title", "slug", "content"]
      });
    }

    // Image URL from multer (if new file uploaded)
    const imageUrl = req.file && req.file.filename
      ? `${req.protocol}://${req.get("host")}/uploads/blogs/${req.file.filename}`
      : null;

    console.log("[updateBlog] id=%s title=%s hasFile=%s", id, title, !!req.file);

    // Try update with image_url first
    let query, values;
    if (imageUrl) {
      query = `
        UPDATE blogs
        SET title=$1, slug=$2, short_description=$3, content=$4, author_name=$5, category=$6, status=$7, image_url=$8
        WHERE id=$9
        RETURNING *;
      `;
      values = [title, slug, short_description, content, author_name, category, status, imageUrl, id];
    } else {
      query = `
        UPDATE blogs
        SET title=$1, slug=$2, short_description=$3, content=$4, author_name=$5, category=$6, status=$7
        WHERE id=$8
        RETURNING *;
      `;
      values = [title, slug, short_description, content, author_name, category, status, id];
    }

    try {
      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }
      return res.json(result.rows[0]);
    } catch (dbErr) {
      // Fallback if image_url column missing
      if (imageUrl && dbErr.message && /image_url|column/i.test(dbErr.message)) {
        console.warn("[updateBlog] image_url column missing, retrying without it");
        const query2 = `
          UPDATE blogs
          SET title=$1, slug=$2, short_description=$3, content=$4, author_name=$5, category=$6, status=$7
          WHERE id=$8
          RETURNING *;
        `;
        const values2 = [title, slug, short_description, content, author_name, category, status, id];
        try {
          const result2 = await pool.query(query2, values2);
          if (result2.rows.length === 0) {
            return res.status(404).json({ error: "Blog not found" });
          }
          return res.json(result2.rows[0]);
        } catch (dbErr2) {
          console.error("[updateBlog] fallback query failed:", dbErr2.message);
          return res.status(500).json({ error: "Database error", details: dbErr2.message });
        }
      }
      console.error("[updateBlog] database error:", dbErr.message);
      return res.status(500).json({ error: "Database error", details: dbErr.message });
    }
  } catch (error) {
    console.error("[updateBlog] unexpected error:", error.message, error.stack);
    return res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Missing blog id" });
    }

    const result = await pool.query("DELETE FROM blogs WHERE id=$1 RETURNING id", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.json({ message: "Blog deleted", id: result.rows[0].id });
  } catch (error) {
    console.error("[deleteBlog] error:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};
