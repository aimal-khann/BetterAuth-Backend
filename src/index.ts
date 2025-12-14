import express from "express";
import cors from "cors";
import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node"; // NEW IMPORT
import "dotenv/config";

const app = express();
const port = 3001;

// Configure CORS to allow requests from the frontend
app.use(
  cors({
    origin: ["http://localhost:3000"], // Array syntax for origin
    credentials: true,
  })
);

// Mount the Better Auth handler using toNodeHandler
app.all("/api/auth/*", toNodeHandler(auth)); // Changed from app.use("/api/auth", auth.handler);

// A simple health check endpoint
app.get("/", (req, res) => {
  res.send("Auth server is running!");
});

app.listen(port, () => {
  console.log(`Auth server listening on http://localhost:${port}`);
});
