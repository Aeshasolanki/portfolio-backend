/*import { pool } from "../db.js";
export const getApps = async (req, res) => {
  try {
    const limitParam = req.query.limit;
    let query = "SELECT * FROM apps ORDER BY id DESC";
    const params = [];

    if (limitParam) {
      const limit = parseInt(limitParam, 10);
      if (!isNaN(limit) && limit > 0) {
        query += " LIMIT $1";
        params.push(limit);
      }
    }

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const createApp = async (req, res) => {
  const {
    name,
    slug,
    category,
    tagline,
    description,
    description_secondary,
    app_store_url,
  } = req.body;

  // Make sure /uploads/ is included
 // appsRoutes.js or controller
const icon_url = req.file
  ? `${process.env.BACKEND_URL}/uploads/${req.file.filename}`
  : undefined; // don’t explicitly insert null



  const result = await pool.query(
    `INSERT INTO apps 
    (name,slug,category,tagline,description,description_secondary,icon_url,app_store_url)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [
      name,
      slug,
      category,
      tagline,
      description,
      description_secondary,
      icon_url,
      app_store_url,
    ]
  );

  res.json(result.rows[0]);
};


export const updateApp = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing app id" });
    }

    // BULLETPROOF: destructure safely with || {}
    const body = req.body || {};
    const name = body.name ? String(body.name).trim() : "";
    const slug = body.slug ? String(body.slug).trim() : "";
    const category = body.category ? String(body.category).trim() : "";
    const tagline = body.tagline ? String(body.tagline).trim() : "";
    const description = body.description ? String(body.description).trim() : "";
    const description_secondary = body.description_secondary ? String(body.description_secondary).trim() : "";
    const app_store_url = body.app_store_url ? String(body.app_store_url).trim() : "";

    // Image URL from multer (if new file uploaded)
    const icon_url = req.file && req.file.filename
      ? `${req.protocol}://${req.get("host")}/uploads/apps/${req.file.filename}`
      : null;

    console.log("[updateApp] id=%s name=%s hasFile=%s icon_url=%s", id, name, !!req.file, icon_url);

    // Build query: if new icon provided, include it; otherwise keep existing
    let query, values;
    if (icon_url) {
      query = `
        UPDATE apps
        SET name=$1, slug=$2, category=$3, tagline=$4, description=$5, description_secondary=$6, app_store_url=$7, icon_url=$8
        WHERE id=$9
        RETURNING *;
      `;
      values = [name, slug, category, tagline, description, description_secondary, app_store_url, icon_url, id];
    } else {
      query = `
        UPDATE apps
        SET name=$1, slug=$2, category=$3, tagline=$4, description=$5, description_secondary=$6, app_store_url=$7
        WHERE id=$8
        RETURNING *;
      `;
      values = [name, slug, category, tagline, description, description_secondary, app_store_url, id];
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "App not found" });
    }

    console.log("[updateApp] Updated app:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("[updateApp] error:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const deleteApp = async (req, res) => {
  await pool.query("DELETE FROM apps WHERE id=$1", [req.params.id]);
  res.json({ message: "deleted" });
};

*/
import { pool } from "../db.js";

export const getApps = async (req, res) => {
  const result = await pool.query("SELECT * FROM apps ORDER BY id DESC");
  res.json(result.rows);
};

export const createApp = async (req, res) => {
  try {
    const {
      name,
      slug,
      category,
      tagline,
      description,
      description_secondary,
      app_store_url,
    } = req.body;

    const icon_url = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/apps/${req.file.filename}`
      : null;

    console.log("[createApp] name=%s hasFile=%s icon_url=%s", name, !!req.file, icon_url);

    const result = await pool.query(
      `INSERT INTO apps
      (name,slug,category,tagline,description,description_secondary,icon_url,app_store_url)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        name,
        slug,
        category,
        tagline,
        description,
        description_secondary,
        icon_url,
        app_store_url,
      ]
    );

    console.log("[createApp] Created app:", result.rows[0].id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("[createApp] error:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const updateApp = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Missing app id" });
    }

    // BULLETPROOF: destructure safely with || {}
    const body = req.body || {};
    const name = body.name ? String(body.name).trim() : "";
    const slug = body.slug ? String(body.slug).trim() : "";
    const category = body.category ? String(body.category).trim() : "";
    const tagline = body.tagline ? String(body.tagline).trim() : "";
    const description = body.description ? String(body.description).trim() : "";
    const description_secondary = body.description_secondary ? String(body.description_secondary).trim() : "";
    const app_store_url = body.app_store_url ? String(body.app_store_url).trim() : "";

    // Image URL from multer (if new file uploaded)
    const icon_url = req.file && req.file.filename
      ? `${req.protocol}://${req.get("host")}/uploads/apps/${req.file.filename}`
      : null;

    console.log("[updateApp] id=%s name=%s hasFile=%s", id, name, !!req.file);

    // Build query: if new icon provided, include it; otherwise keep existing
    let query, values;
    if (icon_url) {
      query = `
        UPDATE apps
        SET name=$1, slug=$2, category=$3, tagline=$4, description=$5, description_secondary=$6, app_store_url=$7, icon_url=$8
        WHERE id=$9
        RETURNING *;
      `;
      values = [name, slug, category, tagline, description, description_secondary, app_store_url, icon_url, id];
    } else {
      query = `
        UPDATE apps
        SET name=$1, slug=$2, category=$3, tagline=$4, description=$5, description_secondary=$6, app_store_url=$7
        WHERE id=$8
        RETURNING *;
      `;
      values = [name, slug, category, tagline, description, description_secondary, app_store_url, id];
    }

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "App not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("[updateApp] error:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

export const deleteApp = async (req, res) => {
  await pool.query("DELETE FROM apps WHERE id=$1", [req.params.id]);
  res.json({ message: "deleted" });
};

