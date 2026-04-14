import express from "express";
import webhookRoutes from "./routes/webhook.routes";

const app = express();

app.use(express.json());

app.use("/", webhookRoutes);

app.listen(3000, () => {
  console.log("🔥 Server running on port 3000");
});