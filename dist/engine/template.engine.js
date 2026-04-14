"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEngine = void 0;
const action_registry_1 = require("./action.registry");
function normalizeText(text) {
    return String(text || "").trim().toLowerCase();
}
class TemplateEngine {
    static async handle(params) {
        const { template, message, senderPhoneNumberId } = params;
        const incomingText = normalizeText(message.text);
        const incomingPayload = String(message.payload || "").trim();
        const recipientPhoneNumber = message.senderPhoneNumber;
        const context = {
            template,
            message,
            senderPhoneNumberId,
            recipientPhoneNumber,
        };
        if (incomingPayload) {
            const buttonTrigger = template.triggers.find((trigger) => trigger.type === "button" && trigger.match === incomingPayload);
            if (buttonTrigger) {
                return action_registry_1.actionRegistry.execute(buttonTrigger.action, context);
            }
        }
        if (incomingText) {
            const textTrigger = template.triggers.find((trigger) => trigger.type === "text" && trigger.match.includes(incomingText));
            if (textTrigger) {
                return action_registry_1.actionRegistry.execute(textTrigger.action, context);
            }
        }
        return action_registry_1.actionRegistry.execute(template.fallbackAction, context);
    }
}
exports.TemplateEngine = TemplateEngine;
