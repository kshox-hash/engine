import { Request, Response } from "express";
import { config } from "../config";
import { ConversationHandler } from "../handler/conversation.handler";
import { WebhookBody } from "../types/whatsapp.types";

export const webhookController = {
  _validateWhatsAppAccount(data: WebhookBody): boolean {
    return data.object === "whatsapp_business_account";
  },

  _getWebhookValues(data: WebhookBody) {
    const values = [];

    for (const entry of data.entry ?? []) {
      for (const change of entry.changes ?? []) {
        if (change.value) {
          values.push(change.value);
        }
      }
    }

    return values;
  },

  _getPhoneMetaData(value: any) {
    return {
      senderPhoneNumberId: value.metadata?.phone_number_id ?? "",
      displayPhoneNumber: value.metadata?.display_phone_number ?? "",
    };
  },

  async _handleStatus(value: any) {
    const { senderPhoneNumberId } = this._getPhoneMetaData(value);

    console.log("STATUS PHONE NUMBER ID:", senderPhoneNumberId);

    for (const status of value.statuses ?? []) {
      console.log("RAW STATUS:");
      console.log(JSON.stringify(status, null, 2));

      await ConversationHandler.handleStatus(status);
    }
  },

  async _handleMessage(value: any) {
    const { senderPhoneNumberId, displayPhoneNumber } =
      this._getPhoneMetaData(value);

    console.log("MESSAGE PHONE NUMBER ID:", senderPhoneNumberId);
    console.log("DISPLAY PHONE NUMBER:", displayPhoneNumber);

    for (const rawMessage of value.messages ?? []) {
      console.log("RAW MESSAGE:");
      console.log(JSON.stringify(rawMessage, null, 2));

      await ConversationHandler.handleMessage(
        senderPhoneNumberId,
        rawMessage
      );
    }
  },

  async _processWebhookValue(value: any): Promise<void> {
    console.log("WEBHOOK VALUE:");
    console.log(JSON.stringify(value, null, 2));

    if (value.statuses?.length) {
      console.log("VALUE CONTAINS STATUSES:", value.statuses.length);
    }

    if (value.messages?.length) {
      console.log("VALUE CONTAINS MESSAGES:", value.messages.length);
    }

    await this._handleStatus(value);
    await this._handleMessage(value);
  },

  async incoming(
    req: Request<unknown, unknown, WebhookBody>,
    res: Response
  ): Promise<void> {
    try {
      console.log("WEBHOOK BODY:");
      console.log(JSON.stringify(req.body, null, 2));

      if (!this._validateWhatsAppAccount(req.body)) {
        console.log("INVALID WEBHOOK OBJECT:", req.body?.object);
        res.sendStatus(404);
        return;
      }

      const values = this._getWebhookValues(req.body);

      console.log("WEBHOOK VALUES COUNT:", values.length);

      for (const value of values) {
        await this._processWebhookValue(value);
      }

      res.status(200).send("EVENT_RECEIVED");
    } catch (err) {
      console.error("WEBHOOK ERROR:");
      console.error(err);

      res.status(500).send("WEBHOOK_ERROR");
    }
  },

  verify(req: Request, res: Response): void {
    console.log("VERIFY WEBHOOK QUERY:");
    console.log(JSON.stringify(req.query, null, 2));

    if (
      req.query["hub.mode"] !== "subscribe" ||
      req.query["hub.verify_token"] !== config.verifyToken
    ) {
      res.sendStatus(403);
      return;
    }

    res.send(String(req.query["hub.challenge"] ?? ""));
  },

  health(_req: Request, res: Response): void {
    res.json({
      message: "Server is running",
      endpoints: ["GET /webhook", "POST /webhook"],
    });
  },
};