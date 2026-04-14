"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(rawMessage) {
        this.rawMessage = rawMessage;
        this.id = rawMessage?.id ?? "";
        this.senderPhoneNumber = rawMessage?.from ?? "";
        if (rawMessage?.type === "text") {
            this.type = "text";
            this.text = rawMessage?.text?.body ?? "";
            this.payload = "";
            return;
        }
        if (rawMessage?.type === "button") {
            this.type = rawMessage?.button?.text ?? "button";
            this.text = rawMessage?.button?.text ?? "";
            this.payload = rawMessage?.button?.payload ?? "";
            return;
        }
        if (rawMessage?.type === "interactive") {
            const buttonReply = rawMessage?.interactive?.button_reply;
            if (buttonReply) {
                this.type = buttonReply.id || buttonReply.title || "interactive_button";
                this.text = buttonReply.title || buttonReply.id || "";
                this.payload = buttonReply.id || "";
                return;
            }
        }
        this.type = rawMessage?.type ?? "unknown";
        this.text = "";
        this.payload = "";
    }
}
exports.Message = Message;
