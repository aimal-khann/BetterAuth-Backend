import express from "express";
import cors from "cors";
import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://physical-ai-humanoid-robotics-bookk.vercel.app",
      "https://physical-ai-humanoid-robotics-book-five-kappa.vercel.app"
      "https://ai-humanoid-robotics-bookk.vercel.app"
    ],
    credentials: true,
  })
);

app.all("/api/auth/*", toNodeHandler(auth));

app.get("/", (req, res) => {
  res.send("Auth server is running!");
});

app.listen(port, () => {
  console.log(`Auth server listening on port ${port}`);
});
