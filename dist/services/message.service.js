"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageService = void 0;
const constants_1 = require("../constants");
const graph_api_services_1 = require("./graph.api.services");
class MessageService {
    static async sendWelcomeButtonsMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, messageText, buttons) {
        return graph_api_services_1.GraphApiService.messageWithInteractiveReply(messageId, senderPhoneNumberId, recipientPhoneNumber, messageText, buttons);
    }
    static async sendFunctionsTemplateMessage(messageId, senderPhoneNumberId, recipientPhoneNumber) {
        return graph_api_services_1.GraphApiService.sendTextMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, "Estas son nuestras funciones disponibles.");
    }
    static async sendChatboxMessage(messageId, senderPhoneNumberId, recipientPhoneNumber) {
        return graph_api_services_1.GraphApiService.sendTextMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, constants_1.constants.APP_CHATBOX_MESSAGE);
    }
    static async sendContactMessage(messageId, senderPhoneNumberId, recipientPhoneNumber) {
        return graph_api_services_1.GraphApiService.sendTextMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, constants_1.constants.APP_CONTACT_MESSAGE);
    }
    static async sendQuoteRuntimeLinkMessage(messageId, senderPhoneNumberId, recipientPhoneNumber) {
        return graph_api_services_1.GraphApiService.sendTextMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, "Aquí puedes iniciar una cotización.");
    }
    static async sendSupportMessage(messageId, senderPhoneNumberId, recipientPhoneNumber) {
        return graph_api_services_1.GraphApiService.sendTextMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, "Te ayudaremos con soporte.");
    }
    static async sendAppointmentsMessage(messageId, senderPhoneNumberId, recipientPhoneNumber) {
        return graph_api_services_1.GraphApiService.sendTextMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, "Aquí puedes tomar horas.");
    }
}
exports.MessageService = MessageService;
