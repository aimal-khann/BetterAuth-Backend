"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./auth");
const node_1 = require("better-auth/node"); // NEW IMPORT
require("dotenv/config");
const app = (0, express_1.default)();
const port = 3001;
// Configure CORS to allow requests from the frontend
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"], // Array syntax for origin
    credentials: true,
}));
// Mount the Better Auth handler using toNodeHandler
app.all("/api/auth/*", (0, node_1.toNodeHandler)(auth_1.auth)); // Changed from app.use("/api/auth", auth.handler);
// A simple health check endpoint
app.get("/", (req, res) => {
    res.send("Auth server is running!");
});
app.listen(port, () => {
    console.log(`Auth server listening on http://localhost:${port}`);
});
