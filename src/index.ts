import express from "express";
import cors from "cors";
import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";
import "dotenv/config";

const app = express();

// FIX: Use the port Railway gives us, or fallback to 3001 for local work
const port = process.env.PORT || 3001;

// Configure CORS
app.use(
  cors({
    // Trust localhost AND your future production frontend
    // (We will add the real Vercel/Netlify link here later)
    origin: ["http://localhost:3000", "https://your-frontend-url.vercel.app"], 
    credentials: true,
  })
);

// Mount the Better Auth handler
app.all("/api/auth/*", toNodeHandler(auth));

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Auth server is running!");
});

// Start the server
app.listen(port, () => {
  console.log(`Auth server listening on port ${port}`);
});
