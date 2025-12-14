"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.auth = (0, better_auth_1.betterAuth)({
    database: new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
    }),
    emailAndPassword: {
        enabled: true,
    },
    user: {
        additionalFields: {
            softwareBackground: { type: "string", required: false, input: true },
            hardwareBackground: { type: "string", required: false, input: true },
        },
    },
    trustedOrigins: ["http://localhost:3000"],
});
