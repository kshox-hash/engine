"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateMainMenu = void 0;
const constants_1 = require("../constants");
exports.templateMainMenu = {
    id: "template_main_menu",
    name: "Menú principal",
    entryAction: "send_main_menu",
    triggers: [
        {
            type: "button",
            match: constants_1.constants.REPLY_FUNCTIONS_ID,
            action: "send_functions_message",
        },
        {
            type: "button",
            match: constants_1.constants.REPLY_CHATBOX_ID,
            action: "send_chatbox_message",
        },
        {
            type: "button",
            match: constants_1.constants.REPLY_CONTACT_ID,
            action: "send_contact_message",
        },
        {
            type: "text",
            match: ["cotizar", "quote_start"],
            action: "send_quote_runtime_link",
        },
        {
            type: "text",
            match: ["chat soporte", "support_start"],
            action: "send_support_message",
        },
        {
            type: "text",
            match: ["toma de horas", "appointments_start"],
            action: "send_appointments_message",
        },
    ],
    texts: {
        welcome: constants_1.constants.APP_DEFAULT_MESSAGE,
    },
    buttons: [
        {
            id: constants_1.constants.REPLY_CHATBOX_ID,
            title: constants_1.constants.REPLY_CHATBOX_CTA,
        },
        {
            id: constants_1.constants.REPLY_FUNCTIONS_ID,
            title: constants_1.constants.REPLY_FUNCTIONS_CTA,
        },
        {
            id: constants_1.constants.REPLY_CONTACT_ID,
            title: constants_1.constants.REPLY_CONTACT_CTA,
        },
    ],
    fallbackAction: "send_main_menu",
};
