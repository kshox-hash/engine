"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookController = void 0;
const config_1 = require("../config");
const conversation_handler_1 = require("../handler/conversation.handler");
exports.webhookController = {
    verify(req, res) {
        if (req.query["hub.mode"] !== "subscribe" ||
            req.query["hub.verify_token"] !== config_1.config.verifyToken) {
            res.sendStatus(403);
            return;
        }
        res.send(String(req.query["hub.challenge"] ?? ""));
    },
    async incoming(req, res) {
        console.log(JSON.stringify(req.body, null, 2));
        if (req.body.object === "whatsapp_business_account") {
            for (const entry of req.body.entry ?? []) {
                for (const change of entry.changes ?? []) {
                    const value = change.value;
                    if (!value)
                        continue;
                    const senderPhoneNumberId = value.metadata?.phone_number_id ?? "";
                    for (const status of value.statuses ?? []) {
                        await conversation_handler_1.ConversationHandler.handleStatus(senderPhoneNumberId, status);
                    }
                    for (const rawMessage of value.messages ?? []) {
                        await conversation_handler_1.ConversationHandler.handleMessage(senderPhoneNumberId, rawMessage);
                    }
                }
            }
        }
        res.status(200).send("EVENT_RECEIVED");
    },
    health(_req, res) {
        res.json({
            message: "Server is running",
            endpoints: [
                "GET /webhook",
                "POST /webhook",
            ],
        });
    },
};
