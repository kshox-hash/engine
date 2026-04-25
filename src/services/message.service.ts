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

  static async sendFunctionsTemplateMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string
  ): Promise<unknown> {
    return GraphApiService.sendTextMessage(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      "Estas son nuestras funciones disponibles."
    );
  }

  static async sendChatboxMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string
  ): Promise<unknown> {
    return GraphApiService.sendTextMessage(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      constants.APP_CHATBOX_MESSAGE
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

  
static async sendQuoteRuntimeLinkMessage(
  messageId: string,
  senderPhoneNumberId: string,
  recipientPhoneNumber: string,
  userId: string
): Promise<unknown> {
  const url = `https://runtimegenerateui.onrender.com/open/cotizador-dinamico/${userId}/${recipientPhoneNumber}`;

  return GraphApiService.sendTextMessage(
    messageId,
    senderPhoneNumberId,
    recipientPhoneNumber,
    `Aquí puedes iniciar tu cotización:\n${url}`
  );
}

  static async sendSupportMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string
  ): Promise<unknown> {
    return GraphApiService.sendTextMessage(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      "Te ayudaremos con soporte."
    );
  }

  static async sendAppointmentsMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string
  ): Promise<unknown> {
    return GraphApiService.sendTextMessage(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      "Aquí puedes tomar horas."
    );
  }

  static async sendCarousel(
  messageId: string,
  senderPhoneNumberId: string,
  recipientPhoneNumber: string,
  template: string
) {
  return GraphApiService.sendCarousel(
    messageId,
    senderPhoneNumberId,
    recipientPhoneNumber,
    template // 👈 TU TEMPLATE DE META
  );
}
}