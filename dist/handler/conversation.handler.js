"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationHandler = void 0;
const message_1 = require("../message");
const status_1 = require("../status");
const template_engine_1 = require("../engine/template.engine");
const templates_repository_1 = require("../templates/templates.repository");
const numbers_repository_1 = require("../templates/numbers.repository");
class ConversationHandler {
    static async handleMessage(senderPhoneNumberId, rawMessage) {
        console.log("RAW MESSAGE =>");
        console.log(JSON.stringify(rawMessage, null, 2));
        const message = new message_1.Message(rawMessage);
        console.log("message.type =>", message.type);
        console.log("message.text =>", message.text);
        console.log("message.payload =>", message.payload);
        console.log("message.id =>", message.id);
        console.log("message.senderPhoneNumber =>", message.senderPhoneNumber);
        const numberConfig = numbers_repository_1.numbersRepository.findByPhoneNumberId(senderPhoneNumberId);
        if (!numberConfig) {
            console.log("❌ Número no registrado en el sistema");
            return;
        }
        if (numberConfig.status !== "active") {
            console.log("⛔ Número inactivo");
            return;
        }
        const template = templates_repository_1.templatesRepository.findById(numberConfig.templateId);
        if (!template) {
            console.log("❌ Plantilla no encontrada");
            return;
        }
        await template_engine_1.TemplateEngine.handle({
            template,
            message,
            senderPhoneNumberId,
        });
    }
    static async handleStatus(senderPhoneNumberId, rawStatus) {
        const status = new status_1.Status(rawStatus);
        console.log("status recibido =>", senderPhoneNumberId, status);
        if (!(status.status === "delivered" || status.status === "read")) {
            return;
        }
    }
}
exports.ConversationHandler = ConversationHandler;
