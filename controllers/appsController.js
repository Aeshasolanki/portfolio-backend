import { pool } from "../db.js";
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

  const icon_url = req.file
    ? `http://localhost:5000/uploads/${req.file.filename}`
    : null;

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
  const { id } = req.params;
  const { name, tagline, description } = req.body;

  await pool.query(
    "UPDATE apps SET name=$1, tagline=$2, description=$3 WHERE id=$4",
    [name, tagline, description, id]
  );

  res.json({ message: "updated" });
};

export const deleteApp = async (req, res) => {
  await pool.query("DELETE FROM apps WHERE id=$1", [req.params.id]);
  res.json({ message: "deleted" });
};


