import { Message } from "../message";
import { MessageService } from "../services/message.service";
import { ChatTemplate, TemplateActionName } from "../types/templates.types";

type ActionContext = {
  template: ChatTemplate;
  message: Message;
  senderPhoneNumberId: string;
  recipientPhoneNumber: string;
  userId: string;
};

export const actionRegistry = {
  async execute(
    actionName: TemplateActionName,
    context: ActionContext
  ): Promise<unknown> {
    const {
      template,
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
      userId,
    } = context;

    switch (actionName) {
      case "send_main_menu":
        return MessageService.sendWelcomeButtonsMessage(
          message.id,
          senderPhoneNumberId,
          recipientPhoneNumber,
          template.texts.welcome,
          template.buttons
        );

      case "send_chatbox_message":
        return MessageService.sendChatboxMessage(
          message.id,
          senderPhoneNumberId,
          recipientPhoneNumber
        );

      case "send_contact_message":
        return MessageService.sendContactMessage(
          message.id,
          senderPhoneNumberId,
          recipientPhoneNumber
        );

      case "send_quote_runtime_link":
        return MessageService.sendQuoteRuntimeLinkMessage(
          message.id,
          senderPhoneNumberId,
          recipientPhoneNumber,
          userId
        );

      case "send_support_message":
        return MessageService.sendSupportMessage(
          message.id,
          senderPhoneNumberId,
          recipientPhoneNumber
        );

      case "send_appointments_message":
        return MessageService.sendAppointmentsMessage(
          message.id,
          senderPhoneNumberId,
          recipientPhoneNumber
        );

      case "send_carousel":
        return MessageService.sendCarousel(
          message.id,
          senderPhoneNumberId,
          recipientPhoneNumber,
          "automatiza_carousel_v3",
          userId
        );

      default:
        throw new Error(`Unsupported action: ${actionName}`);
    }
  },
};