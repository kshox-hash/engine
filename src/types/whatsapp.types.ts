export type RawWhatsAppMessage = {
  id?: string;
  from?: string;
  type?: string;
  text?: {
    body?: string;
  };
  button?: {
    text?: string;
    payload?: string;
  };
  interactive?: {
    button_reply?: {
      id?: string;
      title?: string;
    };
  };
};

export type RawWhatsAppStatus = {
  id: string;
  status: string;
  recipient_id: string;
};

export type WebhookBody = {
  object?: string;
  entry?: Array<{
    changes?: Array<{
      value?: {
        metadata?: {
          phone_number_id?: string;
        };
        messages?: RawWhatsAppMessage[];
        statuses?: RawWhatsAppStatus[];
      };
    }>;
  }>;
};