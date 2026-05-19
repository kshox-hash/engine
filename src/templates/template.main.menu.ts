import { constants } from "../constants";
import { ChatTemplate } from "../types/templates.types";

export const templateMainMenu: ChatTemplate = {
  id: "template_main_menu",
  name: "Menú principal",
  entryAction: "send_main_menu",

  triggers: [
    {
      type: "button",
      match: constants.REPLY_SERVICES_ID,
      action: "send_services_link",
    },
    {
      type: "button",
      match: constants.REPLY_CONTACT_ID,
      action: "send_contact_message",
    },
  ],

  texts: {
    welcome: constants.APP_DEFAULT_MESSAGE,
  },

  buttons: [
    {
      id: constants.REPLY_SERVICES_ID,
      title: constants.REPLY_SERVICES_CTA,
    },
    {
      id: constants.REPLY_CONTACT_ID,
      title: constants.REPLY_CONTACT_CTA,
    },
  ],

  fallbackAction: "send_main_menu",
};