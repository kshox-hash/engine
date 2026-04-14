"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRouter = void 0;
const chatbot_module_1 = require("./chatbot.module");
exports.moduleRouter = {
    async handle(context) {
        return chatbot_module_1.chatbotModule.handle(context);
    },
};
