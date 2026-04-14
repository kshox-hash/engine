"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const REQUIRED_ENV_VARS = [
    "ACCESS_TOKEN",
    "APP_SECRET",
    "VERIFY_TOKEN",
];
exports.config = Object.freeze({
    appSecret: process.env.APP_SECRET ?? "",
    accessToken: process.env.ACCESS_TOKEN ?? "",
    verifyToken: process.env.VERIFY_TOKEN ?? "",
    port: Number(process.env.PORT ?? 8080),
    checkEnvVariables() {
        for (const key of REQUIRED_ENV_VARS) {
            if (!process.env[key]) {
                console.warn(`WARNING: Missing environment variable ${key}`);
            }
        }
    },
});
