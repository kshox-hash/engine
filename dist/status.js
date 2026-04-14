"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
class Status {
    constructor(rawStatus) {
        this.messageId = rawStatus.id;
        this.status = rawStatus.status;
        this.recipientPhoneNumber = rawStatus.recipient_id;
    }
}
exports.Status = Status;
