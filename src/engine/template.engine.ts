import { Message } from "../models/message";
import { actionRegistry } from "./action.registry";
import { ChatTemplate } from "../types/templates.types";

function normalizeText(text: string): string {
  return String(text || "").trim().toLowerCase();
}

function normalizePayload(payload: string): string {
  return String(payload || "").trim();
}

function normalizePhoneNumber(phoneNumber: string): string {
  return String(phoneNumber || "").trim();
}

function resolveTrigger(
  template: ChatTemplate,
  message: Message
) {
  const incomingText = normalizeText(message.text);
  const incomingPayload = normalizePayload(message.payload);

  if (incomingPayload) {
    const buttonTrigger = template.triggers.find(
      (trigger) =>
        trigger.type === "button" &&
        trigger.match === incomingPayload
    );

    if (buttonTrigger) {
      return buttonTrigger;
    }
  }

  if (incomingText) {
    const textTrigger = template.triggers.find(
      (trigger) =>
        trigger.type === "text" &&
        trigger.match.includes(incomingText)
    );

    if (textTrigger) {
      return textTrigger;
    }
  }

  return null;
}

export class TemplateEngine {
  static async handle(params: {
    template: ChatTemplate;
    message: Message;
    senderPhoneNumberId: string;
    userId: string;
    companyName?: string;
  }): Promise<unknown> {
    const {
      template,
      message,
      senderPhoneNumberId,
      userId,
      companyName,
    } = params;

    const recipientPhoneNumber = normalizePhoneNumber(
      message.senderPhoneNumber
    );

    const context = {
      template,
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
      userId,
      companyName,
    };

    const trigger = resolveTrigger(template, message);

    if (trigger) {
      return actionRegistry.execute(trigger.action, context);
    }

    return actionRegistry.execute(template.fallbackAction, context);
  }
}