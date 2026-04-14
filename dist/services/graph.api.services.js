"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphApiService = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
class GraphApiService {
    static async makeApiCall(messageId, senderPhoneNumberId, requestBody) {
        try {
            if (messageId) {
                const typingBody = {
                    messaging_product: "whatsapp",
                    status: "read",
                    message_id: messageId,
                    typing_indicator: {
                        type: "text",
                    },
                };
                await axios_1.default.post(`https://graph.facebook.com/v21.0/${senderPhoneNumberId}/messages`, typingBody, {
                    headers: {
                        Authorization: `Bearer ${config_1.config.accessToken}`,
                        "Content-Type": "application/json",
                    },
                });
            }
            console.log("Request body =>");
            console.log(JSON.stringify(requestBody, null, 2));
            const response = await axios_1.default.post(`https://graph.facebook.com/v21.0/${senderPhoneNumberId}/messages`, requestBody, {
                headers: {
                    Authorization: `Bearer ${config_1.config.accessToken}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("API call successful:");
            console.log(JSON.stringify(response.data, null, 2));
            return response.data;
        }
        catch (error) {
            console.error("Error making API call:");
            console.error(JSON.stringify(error?.response?.data || error, null, 2));
            throw error;
        }
    }
    static async messageWithInteractiveReply(messageId, senderPhoneNumberId, recipientPhoneNumber, messageText, replyCTAs) {
        const requestBody = {
            messaging_product: "whatsapp",
            to: recipientPhoneNumber,
            type: "interactive",
            interactive: {
                type: "button",
                body: {
                    text: messageText,
                },
                action: {
                    buttons: replyCTAs.map((cta) => ({
                        type: "reply",
                        reply: {
                            id: cta.id,
                            title: cta.title,
                        },
                    })),
                },
            },
        };
        return this.makeApiCall(messageId, senderPhoneNumberId, requestBody);
    }
    static async sendTextMessage(messageId, senderPhoneNumberId, recipientPhoneNumber, messageText) {
        const requestBody = {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: recipientPhoneNumber,
            type: "text",
            text: {
                preview_url: true,
                body: messageText,
            },
        };
        return this.makeApiCall(messageId, senderPhoneNumberId, requestBody);
    }
}
exports.GraphApiService = GraphApiService;
