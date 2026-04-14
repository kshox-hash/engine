
const REQUIRED_ENV_VARS = [
  "ACCESS_TOKEN", //
  "APP_SECRET",
  "VERIFY_TOKEN",
];

export const config = Object.freeze({
  appSecret: process.env.APP_SECRET ?? "cfc62ad8dbda1e224e326124b39633d6",
  accessToken: process.env.ACCESS_TOKEN ?? "EAANZAZBf2B3EgBRM6Q9ONG8M7VYYED4u8Yup6lA0z7vlgj8zzlRG0IahkAefwOlD3VEfnWnqDLD5ZAhPkytP0IOlbkETQvdOpMnqNxbTNkKKavyvZAuYfvJD9xUdJBJA0vVp6G5yIlpHZClgne9vtQ1KVJYGJaC48cD04jZBE7ZAKkIIee8E9AysjcZBDXE2rQZDZD",
  verifyToken: process.env.VERIFY_TOKEN ?? "token_verify_123",
  port: Number(process.env.PORT ?? 8080),

  checkEnvVariables(): void {
    for (const key of REQUIRED_ENV_VARS) {
      if (!process.env[key]) {
        console.warn(`WARNING: Missing environment variable ${key}`);
      }
    }
  },
});