import { Router } from "express";
import { webhookController } from "../controller/webhook.controller";

const router = Router();

router.post("/webhook", webhookController.incoming);

export default router;