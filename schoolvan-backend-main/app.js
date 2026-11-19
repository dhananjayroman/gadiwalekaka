import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import bcrypt from "bcryptjs";
import { createServer } from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import configurePassport from "./config/passport.js";
import CarOwner from "./models/CarOwner.js";

import contactRoutes from "./routes/ContactRoutes.js";
import admissionRoutes from "./routes/AdmissionRoutes.js";
import authRoutes from "./routes/UserRoutes.js";
import registerRoutes from "./routes/RegistrationRoutes.js";
import carOwnerRoutes from "./routes/CarOwnerRoutes.js";
import trackingRoutes from "./routes/TrackingRoutes.js";

dotenv.config();

// Connect to Database and Seed CarOwner
connectDB().then(async () => {
  try {
    const ownerEmail = "owner@gmail.com";
    const existingOwner = await CarOwner.findOne({ email: ownerEmail });
    if (!existingOwner) {
      const hashedPassword = await bcrypt.hash("owner123", 10);
      await CarOwner.create({ email: ownerEmail, password: hashedPassword });
      console.log("Seeded default car owner.");
    }
  } catch (err) {
    console.error("Error seeding car owner:", err);
  }
});

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 10000;

// Configure Passport
configurePassport(passport);

// Trust Render / proxy
app.set("trust proxy", 1);

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ CORS Configuration for Vercel, Netlify, and Local Development
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5174",
  "http://localhost:3000",
  "https://schoolvan-frontend.vercel.app",
  "https://schoolvan-frontend-git-main-dhananjayromans-projects.vercel.app",
  "https://schoolvan-frontend-j0n6wc2ff-dhananjayromans-projects.vercel.app"
];

const isOriginAllowed = (origin) => {
  if (!origin) return true; // allow non-browser requests (curl, mobile, etc.)
  if (allowedOrigins.includes(origin)) return true;
  if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) return true;
  // Automatically allow any Vercel deployment (production & branch previews)
  if (/^https:\/\/.*\.vercel\.app$/.test(origin)) return true;
  // Automatically allow any Netlify deployment (production & deploy previews)
  if (/^https:\/\/.*\.netlify\.app$/.test(origin)) return true;
  return false;
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ✅ Socket.IO Setup
const io = new Server(httpServer, {
  cors: {
    origin: (origin, callback) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 Client connected to Socket.IO:", socket.id);
  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

// ✅ Session with MongoDB Store
app.use(
  session({
    name: "schoolvan.sid",
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ReactSchoolvan",
      collectionName: "sessions",
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ✅ Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/carowner", carOwnerRoutes);
app.use("/api/tracking", trackingRoutes);

// Root
app.get("/", (req, res) => {
  res.send("🚗 School Van Booking API is running!");
});

// Server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
