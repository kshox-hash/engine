import { Router } from "express";
import { webhookController } from "../controller/webhook.controller";

const router = Router();
/*
cuando se quiere verificar la ruta para interactura con meta developers.
 */
router.get("/webhook", webhookController.verify);
/**
 Cuando un cliente le habla al chat, entra aqui [webhookController.incoming]
 */
router.post("/webhook", webhookController.incoming);
/**
 para checkear si esta arriba el server
 */
router.get("/health", webhookController.health);

export default router;