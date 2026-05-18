import axios from "axios";
import { config } from "../config";
import { TemplateButton } from "../types/templates.types";

export class GraphApiService {
  /*
  =========================================================
  CONFIGURACIÓN BASE GRAPH API
  =========================================================
  */

  private static getMessagesUrl(senderPhoneNumberId: string): string {
    return `https://graph.facebook.com/v21.0/${senderPhoneNumberId}/messages`;
  }

  private static getHeaders() {
    return {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
    };
  }

  /*
  =========================================================
  LLAMADA BASE A META
  =========================================================
  */

  private static async makeApiCall(
    messageId: string | undefined,
    senderPhoneNumberId: string,
    requestBody: unknown
  ): Promise<unknown> {
    try {
      const url = this.getMessagesUrl(senderPhoneNumberId);
      const headers = this.getHeaders();

      if (messageId) {
        const typingBody = {
          messaging_product: "whatsapp",
          status: "read",
          message_id: messageId,
          typing_indicator: {
            type: "text",
          },
        };

        await axios.post(url, typingBody, { headers });
      }

      console.log("Request body =>");
      console.log(JSON.stringify(requestBody, null, 2));

      const response = await axios.post(url, requestBody, { headers });

      console.log("API call successful:");
      console.log(JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error: any) {
      console.error("Error making API call:");
      console.error(JSON.stringify(error?.response?.data || error, null, 2));
      throw error;
    }
  }

  /*
  =========================================================
  MENSAJE INTERACTIVO CON BOTONES
  =========================================================
  */

  static async messageWithInteractiveReply(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string,
    messageText: string,
    replyCTAs: TemplateButton[]
  ): Promise<unknown> {
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

  /*
  =========================================================
  MENSAJE DE TEXTO SIMPLE
  =========================================================
  */

  static async sendTextMessage(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string,
    messageText: string
  ): Promise<unknown> {
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

  /*
  =========================================================
  TEMPLATE CON CARRUSEL MULTIMEDIA
  =========================================================
  */

  static async messageWithMediaCardCarousel(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string,
    options: any
  ): Promise<unknown> {
    const { templateName, locale, cards } = options;

    const requestBody = {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: recipientPhoneNumber,
      type: "template",
      template: {
        name: templateName,
        language: {
          code: locale,
        },
        components: [
          {
            type: "carousel",
            cards: cards.map((card: any, idx: number) => {
              const cardComponents: any[] = [
                {
                  type: "header",
                  parameters: [
                    {
                      type: "image",
                      image: {
                        link: card.imageLink,
                      },
                    },
                  ],
                },
              ];

              if (card.bodyParameters?.length) {
                cardComponents.push({
                  type: "body",
                  parameters: card.bodyParameters.map((value: string) => ({
                    type: "text",
                    text: value,
                  })),
                });
              }

              if (card.buttonUrlSuffix) {
                cardComponents.push({
                  type: "button",
                  sub_type: "url",
                  index: 0,
                  parameters: [
                    {
                      type: "text",
                      text: card.buttonUrlSuffix,
                    },
                  ],
                });
              }

              return {
                card_index: idx,
                components: cardComponents,
              };
            }),
          },
        ],
      },
    };

    return this.makeApiCall(messageId, senderPhoneNumberId, requestBody);
  }

  /*
  =========================================================
  CARRUSEL ESPECÍFICO DEL BOT
  =========================================================
  */

  static async sendCarousel(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string,
    template: string,
    userId: string
  ): Promise<unknown> {
    const safeRecipient = String(recipientPhoneNumber || "").replace(/\D/g, "");

    const payload = `${userId}__${safeRecipient || "lead-demo-001"}`;

    return this.messageWithMediaCardCarousel(
      messageId,
      senderPhoneNumberId,
      recipientPhoneNumber,
      {
        templateName: template,
        locale: "es",
        cards: [
          {
            imageLink:
              "https://pub-9df4bc34eee249debc0d04d6df729879.r2.dev/generatefix.png",
            buttonUrlSuffix: payload,
          },
          {
            imageLink:
              "https://pub-9df4bc34eee249debc0d04d6df729879.r2.dev/avatar.png",
            buttonUrlSuffix: safeRecipient || "lead-demo-002",
          },
          {
            imageLink:
              "https://pub-9df4bc34eee249debc0d04d6df729879.r2.dev/avatar.png",
            buttonUrlSuffix: safeRecipient || "lead-demo-003",
          },
        ],
      }
    );
  }
}