import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import notesRoutes from "../src/routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend origin
  })
);
app.use(express.json()); // parse the JSOn bodies: req.body
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT", PORT);
  });
});
