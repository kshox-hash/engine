import { constants } from "../constants";
import { ChatTemplate } from "../types/templates.types";

export const templateMainMenu: ChatTemplate = {
  id: "template_main_menu",
  name: "Menú principal",
  entryAction: "send_main_menu",

  triggers: [
    {
      type: "button",
      match: constants.REPLY_FUNCTIONS_ID,
      action: "send_carousel",
    },
    {
      type: "button",
      match: constants.REPLY_CHATBOX_ID,
      action: "send_chatbox_message",
    },
    {
      type: "button",
      match: constants.REPLY_CONTACT_ID,
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
    welcome: constants.APP_DEFAULT_MESSAGE,
  },

  buttons: [
    {
      id: constants.REPLY_CHATBOX_ID,
      title: constants.REPLY_CHATBOX_CTA,
    },
    {
      id: constants.REPLY_FUNCTIONS_ID,
      title: constants.REPLY_FUNCTIONS_CTA,
    },
    {
      id: constants.REPLY_CONTACT_ID,
      title: constants.REPLY_CONTACT_CTA,
    },
  ],

  fallbackAction: "send_main_menu",
};