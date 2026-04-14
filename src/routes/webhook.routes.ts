import { Router } from "express";
import { webhookController } from "../controller/webhook.controller";

const router = Router();

router.get("/webhook", webhookController.verify);
router.post("/webhook", webhookController.incoming);
router.get("/health", webhookController.health);

export default router;