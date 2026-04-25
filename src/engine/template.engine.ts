import { Message } from "../message";
import { actionRegistry } from "./action.registry";
import { ChatTemplate } from "../types/templates.types";

function normalizeText(text: string): string {
  return String(text || "").trim().toLowerCase();
}

export class TemplateEngine {
  static async handle(params: {
    template: ChatTemplate;
    message: Message;
    senderPhoneNumberId: string;
    userId: string;
  }): Promise<unknown> {
    const { template, message, senderPhoneNumberId, userId } = params;

    const incomingText = normalizeText(message.text);
    const incomingPayload = String(message.payload || "").trim();
    const recipientPhoneNumber = message.senderPhoneNumber;

    const context = {
      template,
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
      userId,
    };

    if (incomingPayload) {
      const buttonTrigger = template.triggers.find(
        (trigger) =>
          trigger.type === "button" && trigger.match === incomingPayload
      );

      if (buttonTrigger) {
        return actionRegistry.execute(buttonTrigger.action, context);
      }
    }

    if (incomingText) {
      const textTrigger = template.triggers.find(
        (trigger) =>
          trigger.type === "text" && trigger.match.includes(incomingText)
      );

      if (textTrigger) {
        return actionRegistry.execute(textTrigger.action, context);
      }
    }

    return actionRegistry.execute(template.fallbackAction, context);
  }
}