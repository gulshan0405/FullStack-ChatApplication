import express from "express";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDb } from "./lib/db.js";
import { initSocket } from "./lib/socket.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.set("trust proxy", 1);

// CORS MUST BE FIRST
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatty-murex-omega.vercel.app",
      "https://chatty-ascsfqtxt-gulshan0405s-projects.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Allow preflight
app.options("*", cors());

// JSON + FORM
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Socket.IO
initSocket(server);

// Start server
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDb();
});
