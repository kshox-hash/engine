import { Message } from "../models/message";
import { Status } from "../models/status";

import { TemplateEngine } from "../engine/template.engine";

import { templateMainMenu } from "../templates/template.main.menu";

import {
  RawWhatsAppMessage,
  RawWhatsAppStatus
} from "../types/whatsapp.types";

import { findByPhoneNumberService } from "../services/whatsapp-number.service";

export class ConversationHandler {

  // =========================================
  // MANEJA MENSAJES ENTRANTES
  // =========================================
  static async handleMessage(

    // ID del número de WhatsApp que recibió el mensaje
    senderPhoneNumberId: string,

    // Mensaje crudo recibido desde Meta/WhatsApp
    rawMessage: RawWhatsAppMessage

  ): Promise<void> {

    // =========================================
    // TRANSFORMA EL MENSAJE CRUDO
    // EN UN OBJETO INTERNO DEL SISTEMA
    // =========================================
    const message = new Message(rawMessage);

    // =========================================
    // BUSCA CONFIGURACIÓN DEL NÚMERO
    // EN LA BASE DE DATOS
    // =========================================
    const numberConfig = await findByPhoneNumberService(
      senderPhoneNumberId
    );

    // =========================================
    // SI EL NÚMERO NO EXISTE EN EL SISTEMA
    // TERMINA EL FLUJO
    // =========================================
    if (!numberConfig) {

      console.log("Número no registrado en el sistema");

      return;
    }

    // =========================================
    // TEMPLATE PRINCIPAL DEL CHATBOT
    // =========================================
    const template = templateMainMenu;

    // =========================================
    // EJECUTA EL MOTOR DE TEMPLATES
    // =========================================
    await TemplateEngine.handle({
  template,
  message,
  senderPhoneNumberId,
  userId: numberConfig.id,
  companyName: numberConfig.company_name,
});
  }

  // =========================================
  // VALIDA SI EL STATUS ES IMPORTANTE
  // PARA EL SISTEMA
  // =========================================
  private static isStatus(status: string): boolean {

    return (
      status === "delivered" ||
      status === "read"
    );
  }

  // =========================================
  // MANEJA STATUS ENTRANTES DESDE WHATSAPP
  // =========================================
  static async handleStatus(

    // Status crudo enviado por Meta
    rawStatus: RawWhatsAppStatus

  ): Promise<void> {

    // =========================================
    // TRANSFORMA EL STATUS CRUDO
    // EN UN OBJETO INTERNO
    // =========================================
    const status = new Status(rawStatus);

    // =========================================
    // SI EL STATUS NO ES RELEVANTE
    // TERMINA EL FLUJO
    // =========================================
    if (!ConversationHandler.isStatus(status.status)) {

      return;
    }
  }
}