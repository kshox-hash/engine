import { Message } from "../models/message";
import { MessageService } from "../services/message.service";

import {
  ChatTemplate,
  TemplateActionName,
} from "../types/templates.types";

type ActionContext = {
  template: ChatTemplate;
  message: Message;
  senderPhoneNumberId: string;
  recipientPhoneNumber: string;
  userId: string;
};

type ActionHandler = (
  context: ActionContext
) => Promise<unknown>;

const actions: Record<
  TemplateActionName,
  ActionHandler
> = {
  send_main_menu: async (context) => {
    const {
      template,
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
    } = context;

    return MessageService.sendWelcomeButtonsMessage(
      message.id,
      senderPhoneNumberId,
      recipientPhoneNumber,
      template.texts.welcome,
      template.buttons
    );
  },

  send_services_link: async (context) => {
    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
      userId,
    } = context;

    return MessageService.sendServicesLinkMessage(
      message.id,
      senderPhoneNumberId,
      recipientPhoneNumber,
      userId
    );
  },

  send_contact_message: async (context) => {
    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
    } = context;

    return MessageService.sendContactMessage(
      message.id,
      senderPhoneNumberId,
      recipientPhoneNumber
    );
  },
};

export const actionRegistry = {
  async execute(
    actionName: TemplateActionName,
    context: ActionContext
  ): Promise<unknown> {
    const action = actions[actionName];

    if (!action) {
      throw new Error(
        `Unsupported action: ${actionName}`
      );
    }

    return action(context);
  },
};