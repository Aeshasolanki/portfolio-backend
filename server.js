/*import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import appsRoutes from "./routes/apps.js";
import blogsRoutes from "./routes/blogsRoutes.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/apps", appsRoutes);
app.use("/uploads/apps", express.static(path.join(__dirname, "uploads/apps")));
//app.use("/uploads/blogs", express.static(path.join(__dirname, "uploads/blogs")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/blogs", blogsRoutes);
//app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors({
  origin: "https://portfolio-admin-sand.vercel.app", // your frontend URL
}));
//app.use("/api/apps", appsRoutes);
//app.use("/api/blogs", blogsRoutes);
//app.use("/api/blogs", blogsRoutes);
app.listen(5000, () => {
  console.log("Backend running on port 5000");
});*/
/*import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import appsRoutes from "./routes/apps.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS
app.use(cors({ origin: "https://portfolio-admin-sand.vercel.app" }));

// JSON
app.use(express.json());

// Ensure folders exist
["uploads/apps", "uploads/blogs"].forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
});

// Routes
app.use("/api/apps", appsRoutes);
app.use("/api/blogs", blogsRoutes);

// Serve uploads
app.use("/uploads/apps", express.static(path.join(__dirname, "uploads/apps")));
app.use("/uploads/blogs", express.static(path.join(__dirname, "uploads/blogs")));

app.listen(5000, () => console.log("Backend running on port 5000"));
*/
/*import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import appsRoutes from "./routes/apps.js";
import blogsRoutes from "./routes/blogsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS: allow your frontend URL
app.use(cors({ origin: "https://portfolio-admin-sand.vercel.app" }));

// JSON body parsing
app.use(express.json());

["uploads/blogs"].forEach(folder => {
  const folderPath = path.join(folder);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
});

// Routes
app.use("/api/apps", appsRoutes);
//app.use("/api/blogs", blogsRoutes);
app.use("/uploads/blogs", express.static(path.join("uploads/blogs")));

// Routes
app.use("/api/blogs", blogsRoutes);
// Serve uploads
app.use("/uploads/apps", express.static(path.join(__dirname, "uploads/apps")));
//app.use("/uploads/blogs", express.static(path.join(__dirname, "uploads/blogs")));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));

*/
/*import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import appsRoutes from "./routes/apps.js";
import blogsRoutes from "./routes/blogsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS: allow only your frontend
app.use(cors({ origin: "https://portfolio-admin-sand.vercel.app" }));

// JSON body parser
app.use(express.json());

// Ensure upload folders exist
["uploads/apps", "uploads/blogs"].forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath, { recursive: true });
});

// Serve static uploads
app.use("/uploads/apps", express.static(path.join(__dirname, "uploads/apps")));
app.use("/uploads/blogs", express.static(path.join(__dirname, "uploads/blogs")));

// API routes
app.use("/api/apps", appsRoutes);
app.use("/api/blogs", blogsRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
*/
/*import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import appsRoutes from "./routes/apps.js";
import blogsRoutes from "./routes/blogsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


// ✅ CORS FIX (multipart safe)
app.use(cors({
  origin: true,
  credentials: true
}));


// ✅ BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ✅ CREATE UPLOAD FOLDERS
["uploads/apps", "uploads/blogs"].forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("Created:", folderPath);
  }
});


// ✅ STATIC FILES
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// ✅ ROUTES
app.use("/api/apps", appsRoutes);
app.use("/api/blogs", blogsRoutes);


// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.send("Backend running 🚀");
});


// Global error handler (returns JSON) to capture multer and other middleware errors
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR HANDLER:", err && err.message ? err.message : err);
  if (res.headersSent) return next(err);
  const status = err && err.statusCode ? err.statusCode : 500;
  res.status(status).json({ error: err.message || "Internal server error" });
});


// ✅ GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    message: "Internal server error",
    error: err.message
  });
});


// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});*/
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import appsRoutes from "./routes/apps.js";
import blogsRoutes from "./routes/blogsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: Allow all origins (safe for deployed backends)
app.use(cors({ origin: true, credentials: true }));

// ✅ BODY PARSERS
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// ✅ CREATE UPLOAD FOLDERS
["uploads/apps", "uploads/blogs"].forEach(folder => {
  const folderPath = path.join(__dirname, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log("[server] Created folder:", folderPath);
  }
});

// ✅ SERVE STATIC UPLOADS
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ HEALTH CHECK
app.get("/", (req, res) => {
  res.json({ status: "running", timestamp: new Date().toISOString() });
});

// ✅ API ROUTES
app.use("/api/apps", appsRoutes);
app.use("/api/blogs", blogsRoutes);

// ✅ 404 HANDLER
app.use((req, res) => {
  res.status(404).json({ error: "Not found", path: req.path });
});

// ✅ GLOBAL ERROR HANDLER (catches all errors including multer)
app.use((err, req, res, next) => {
  console.error("[ERROR]", err.message || err);
  if (res.headersSent) return next(err);
  const status = err.statusCode || err.status || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ error: message });
});

// ✅ START SERVER
const server = app.listen(PORT, () => {
  console.log(`[server] Backend running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("[server] SIGTERM received, shutting down...");
  server.close(() => {
    console.log("[server] Server closed");
    process.exit(0);
  });
});
