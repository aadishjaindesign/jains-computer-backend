
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



app.use(cors({
  origin: ["https://jainscomputer.com", "https://www.jainscomputer.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("(.*)", cors());

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
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