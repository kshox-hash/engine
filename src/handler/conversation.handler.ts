import { Message } from "../message";
import { Status } from "../status";
import { TemplateEngine } from "../engine/template.engine";
import { templatesRepository } from "../templates/templates.repository";
import { numbersRepository } from "../templates/numbers.repository";
import { RawWhatsAppMessage, RawWhatsAppStatus } from "../types/whatsapp.types";

export class ConversationHandler {
  static async handleMessage(
    senderPhoneNumberId: string,
    rawMessage: RawWhatsAppMessage
  ): Promise<void> {
    console.log("RAW MESSAGE =>");
    console.log(JSON.stringify(rawMessage, null, 2));

    const message = new Message(rawMessage);

    
    const numberConfig =
      numbersRepository.findByPhoneNumberId(senderPhoneNumberId);

    if (!numberConfig) {
      console.log("Número no registrado en el sistema");
      return;
    }

    if (numberConfig.status !== "active") {
      console.log("Número inactivo");
      return;
    }

    const template = templatesRepository.findById(numberConfig.templateId);

    if (!template) {
      console.log("Plantilla no encontrada");
      return;
    }

    await TemplateEngine.handle({
      template,
      message,
      senderPhoneNumberId,
    });
  }

  static async handleStatus(
    senderPhoneNumberId: string,
    rawStatus: RawWhatsAppStatus
  ): Promise<void> {
    const status = new Status(rawStatus);

    console.log("status recibido =>", senderPhoneNumberId, status);

    if (!(status.status === "delivered" || status.status === "read")) {
      return;
    }
  }
}