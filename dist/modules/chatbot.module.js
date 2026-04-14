"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatbotModule = void 0;
exports.chatbotModule = {
    async handle(context) {
        const { event, session } = context;
        console.log("🤖 Chatbot activo");
        switch (session.step) {
            case "start":
                console.log("➡️ Preguntando nombre");
                session.step = "ASK_NAME";
                break;
            case "ASK_NAME":
                console.log("👤 Nombre recibido:", event.text);
                session.data.name = event.text;
                session.step = "DONE";
                break;
            default:
                console.log("✅ Flujo terminado");
        }
    },
};
