
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"])
import leadRoutes from "./routes/leadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import helmet from "helmet";                         
import sitemapRoute from "./routes/sitemapRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";

connectDB();

const app = express();

// 🔐 security + limit
app.use(express.json({ limit: "10kb" }));

// Manual CORS - sabse pehle
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://jainscomputer.com");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") return res.status(200).end();
  next();
});

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors({
  origin: ["https://jainscomputer.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// 📝 request log
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/", sitemapRoute); 

// 👤 USER
app.use("/api", leadRoutes);

// 🔴 ADMIN
app.use("/api/admin", adminRoutes);

app.use("/api/certificates", certificateRoutes);

// 🧪 test route
app.get("/api/test", (req, res) => {
  res.json({ message: "API working ✅" });
});

// default route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🚨 error handling
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err.message);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});