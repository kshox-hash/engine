import { constants } from "../constants";
import { GraphApiService } from "./graph.api.services";
import { TemplateButton } from "../types/templates.types";

export class MessageService {
  static async sendWelcomeButtonsMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string,
    messageText: string,
    buttons: TemplateButton[]
  ): Promise<unknown> {
    return GraphApiService.messageWithInteractiveReply(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      messageText,
      buttons
    );
  }

  static async sendServicesLinkMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string,
    userId: string
  ): Promise<unknown> {
    const safeRecipient = String(recipientPhoneNumber || "").replace(/\D/g, "");

    const url =
      `https://runtimegenerateui.onrender.com/open/menu/${userId}/${safeRecipient}`;

    return GraphApiService.sendTextMessage(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      `Puedes revisar nuestros servicios aquí:\n${url}`
    );
  }

  static async sendContactMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string
  ): Promise<unknown> {
    return GraphApiService.sendTextMessage(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      constants.APP_CONTACT_MESSAGE
    );
  }
}