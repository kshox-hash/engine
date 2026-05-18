import { Request, Response } from "express";
import { config } from "../config";
import { ConversationHandler } from "../handler/conversation.handler";
import { WebhookBody } from "../types/whatsapp.types";

export const webhookController = {

  /*
  =========================================================
  HELPERS
  =========================================================
  Métodos internos del controller.
  Su objetivo es dejar el método incoming()
  más limpio y fácil de leer.
  =========================================================
  */

  // Valida que el webhook venga desde una cuenta de WhatsApp Business.
  _validateWhatsAppAccount(data: WebhookBody): boolean {
    return data.object === "whatsapp_business_account";
  },

  // Extrae todos los "value" que vienen dentro del body de Meta.
  // Meta puede enviar varios entry y varios changes.
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

  // Extrae la metadata del número de WhatsApp que recibió el mensaje.
  _getPhoneMetaData(value: any) {
    return {
      senderPhoneNumberId: value.metadata?.phone_number_id ?? "",
      displayPhoneNumber: value.metadata?.display_phone_number ?? "",
    };
  },

  // Maneja los status enviados por WhatsApp:
  // sent, delivered, read, failed, etc.
  async _handleStatus(value: any) {
    const { senderPhoneNumberId } = this._getPhoneMetaData(value);

    for (const status of value.statuses ?? []) {
      await ConversationHandler.handleStatus(status);
    }
  },

  // Maneja los mensajes entrantes enviados por usuarios.
  async _handleMessage(value: any) {
    const { senderPhoneNumberId } = this._getPhoneMetaData(value);

    for (const rawMessage of value.messages ?? []) {
      await ConversationHandler.handleMessage(
        senderPhoneNumberId,
        rawMessage
      );
    }
  },

  // Procesa cada "value" recibido desde Meta.
  // Un value puede traer mensajes, status o ambos.
  async _processWebhookValue(value: any): Promise<void> {
    await this._handleStatus(value);
    await this._handleMessage(value);
  },

  /*
  =========================================================
  METHODS
  =========================================================
  Métodos públicos usados por las rutas de Express.
  =========================================================
  */

  // Endpoint POST /webhook
  // Recibe eventos reales desde Meta/WhatsApp.
  async incoming(
    req: Request<unknown, unknown, WebhookBody>,
    res: Response
  ): Promise<void> {
    try {
      // Si el body no corresponde a WhatsApp Business,
      // se rechaza el webhook.
      if (!this._validateWhatsAppAccount(req.body)) {
        res.sendStatus(404);
        return;
      }

      // Extrae los bloques value desde el body completo.
      const values = this._getWebhookValues(req.body);

      // Procesa cada value recibido.
      for (const value of values) {
        await this._processWebhookValue(value);
      }

      // Meta espera una respuesta 200 para confirmar recepción.
      res.status(200).send("EVENT_RECEIVED");

    } catch (err) {
      // Si algo falla, responde error interno.
      res.status(500).send("WEBHOOK_ERROR");
    }
  },

  // Endpoint GET /webhook
  // Meta lo usa para verificar el webhook al configurarlo.
  verify(req: Request, res: Response): void {
    if (
      req.query["hub.mode"] !== "subscribe" ||
      req.query["hub.verify_token"] !== config.verifyToken
    ) {
      res.sendStatus(403);
      return;
    }

    // Si el token es correcto, se devuelve el challenge de Meta.
    res.send(String(req.query["hub.challenge"] ?? ""));
  },

  // Endpoint de prueba para saber si el servidor está vivo.
  health(_req: Request, res: Response): void {
    res.json({
      message: "Server is running",
      endpoints: ["GET /webhook", "POST /webhook"],
    });
  },
};