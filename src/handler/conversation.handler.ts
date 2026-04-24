import { Message } from "../message";
import { Status } from "../status";
import { TemplateEngine } from "../engine/template.engine";
import { RawWhatsAppMessage, RawWhatsAppStatus } from "../types/whatsapp.types";
import { getTemplateIdService } from "../services/template_service";

//Searh number service
import { findByPhoneNumberService } from "../services/whatsapp-number.service";

export class ConversationHandler {
  static async handleMessage(
    senderPhoneNumberId: string,
    rawMessage: RawWhatsAppMessage
  ): Promise<void> {

    const message = new Message(rawMessage);
    //buscar numero en db
    const numberConfig = await findByPhoneNumberService(senderPhoneNumberId);
     
    if (!numberConfig) {
      console.log("Número no registrado en el sistema");
      return;
    }

    const template = await getTemplateIdService("template_main_menu")

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