import { RawWhatsAppStatus } from "./types/whatsapp.types";

export class Status {
  messageId: string;
  status: string;
  recipientPhoneNumber: string;

  constructor(rawStatus: RawWhatsAppStatus) {
    this.messageId = rawStatus.id;
    this.status = rawStatus.status;
    this.recipientPhoneNumber = rawStatus.recipient_id;
  }
}