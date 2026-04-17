import axios from "axios";
import { config } from "../config";
import { TemplateButton } from "../types/templates.types";

export class GraphApiService {
  private static async makeApiCall(
    messageId: string | undefined,
    senderPhoneNumberId: string,
    requestBody: unknown
  ): Promise<unknown> {
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

        await axios.post(
          `https://graph.facebook.com/v21.0/${senderPhoneNumberId}/messages`,
          typingBody,
          {
            headers: {
              Authorization: `Bearer ${config.accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      console.log("Request body =>");
      console.log(JSON.stringify(requestBody, null, 2));

      const response = await axios.post(
        `https://graph.facebook.com/v21.0/${senderPhoneNumberId}/messages`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${config.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API call successful:");
      console.log(JSON.stringify(response.data, null, 2));

      return response.data;
    } catch (error: any) {
      console.error("Error making API call:");
      console.error(JSON.stringify(error?.response?.data || error, null, 2));
      throw error;
    }
  }

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

  static async sendCarousel(
    messageId: string,
    senderPhoneNumberId: string,
    recipientPhoneNumber: string,
    template: string,
     userId: "4c25123a-117b-4bdb-87fe-f6afb15d3c2c",

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
            buttonUrlSuffix: payload
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