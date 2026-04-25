import { Message } from "../message";
import { Status } from "../status";
import { TemplateEngine } from "../engine/template.engine";
import { templateMainMenu } from "../templates/template.main.menu";
import { RawWhatsAppMessage, RawWhatsAppStatus } from "../types/whatsapp.types";
import { findByPhoneNumberService } from "../services/whatsapp-number.service";

export class ConversationHandler {
  static async handleMessage(
    senderPhoneNumberId: string,
    rawMessage: RawWhatsAppMessage
  ): Promise<void> {
    const message = new Message(rawMessage);

    const numberConfig = await findByPhoneNumberService(senderPhoneNumberId);

    if (!numberConfig) {
      console.log("Número no registrado en el sistema");
      return;
    }

    const template = templateMainMenu;

    await TemplateEngine.handle({
      template,
      message,
      senderPhoneNumberId,
      userId: numberConfig.id,
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