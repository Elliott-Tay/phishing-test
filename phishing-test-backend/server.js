import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Visit Schema
const visitSchema = new mongoose.Schema({
  url: String,
  referrer: String,
  userAgent: String,
  language: String,
  screenWidth: Number,
  screenHeight: Number,
  colorDepth: Number,
  timezoneOffset: Number,
  platform: String,
  cookiesEnabled: Boolean,
  online: Boolean,
  ip: String,
  timestamp: Date
});

const Visit = mongoose.model("Visit", visitSchema);

// Log visit endpoint
app.post("/log-visit", async (req, res) => {
  try {
    // Get client IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    const visit = new Visit({
      ...req.body,
      ip
    });

    await visit.save();
    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ status: "error", error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));