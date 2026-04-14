import { Request, Response } from "express";
import { config } from "../config";
import { ConversationHandler } from "../handler/conversation.handler";
import { WebhookBody } from "../types/whatsapp.types";

export const webhookController = {
  verify(req: Request, res: Response): void {
    if (
      req.query["hub.mode"] !== "subscribe" ||
      req.query["hub.verify_token"] !== config.verifyToken
    ) {
      res.sendStatus(403);
      return;
    }

    res.send(String(req.query["hub.challenge"] ?? ""));
  },

  async incoming(req: Request<unknown, unknown, WebhookBody>, res: Response) {
    console.log(JSON.stringify(req.body, null, 2));

    if (req.body.object === "whatsapp_business_account") {
      for (const entry of req.body.entry ?? []) {
        for (const change of entry.changes ?? []) {
          const value = change.value;

          if (!value) continue;

          const senderPhoneNumberId = value.metadata?.phone_number_id ?? "";

          for (const status of value.statuses ?? []) {
            await ConversationHandler.handleStatus(senderPhoneNumberId, status);
          }

          for (const rawMessage of value.messages ?? []) {
            await ConversationHandler.handleMessage(
              senderPhoneNumberId,
              rawMessage
            );
          }
        }
      }
    }

    res.status(200).send("EVENT_RECEIVED");
  },

  health(_req: Request, res: Response): void {
    res.json({
      message: "Server is running",
      endpoints: [
        "GET /webhook",
        "POST /webhook",
      ],
    });
  },
};