"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const webhook_controller_1 = require("../controller/webhook.controller");
const router = (0, express_1.Router)();
router.get("/webhook", webhook_controller_1.webhookController.verify);
router.post("/webhook", webhook_controller_1.webhookController.incoming);
router.get("/health", webhook_controller_1.webhookController.health);
exports.default = router;
