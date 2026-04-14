"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionRegistry = void 0;
const message_service_1 = require("../services/message.service");
exports.actionRegistry = {
    async execute(actionName, context) {
        const { template, message, senderPhoneNumberId, recipientPhoneNumber } = context;
        switch (actionName) {
            case "send_main_menu":
                return message_service_1.MessageService.sendWelcomeButtonsMessage(message.id, senderPhoneNumberId, recipientPhoneNumber, template.texts.welcome, template.buttons);
            case "send_functions_message":
                return message_service_1.MessageService.sendFunctionsTemplateMessage(message.id, senderPhoneNumberId, recipientPhoneNumber);
            case "send_chatbox_message":
                return message_service_1.MessageService.sendChatboxMessage(message.id, senderPhoneNumberId, recipientPhoneNumber);
            case "send_contact_message":
                return message_service_1.MessageService.sendContactMessage(message.id, senderPhoneNumberId, recipientPhoneNumber);
            case "send_quote_runtime_link":
                return message_service_1.MessageService.sendQuoteRuntimeLinkMessage(message.id, senderPhoneNumberId, recipientPhoneNumber);
            case "send_support_message":
                return message_service_1.MessageService.sendSupportMessage(message.id, senderPhoneNumberId, recipientPhoneNumber);
            case "send_appointments_message":
                return message_service_1.MessageService.sendAppointmentsMessage(message.id, senderPhoneNumberId, recipientPhoneNumber);
            default:
                throw new Error(`Unsupported action: ${actionName}`);
        }
    },
};
