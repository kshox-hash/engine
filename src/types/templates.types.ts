export type TemplateActionName =
  | "send_main_menu"
  | "send_chatbox_message"
  | "send_contact_message"
  | "send_quote_runtime_link"
  | "send_support_message"
  | "send_appointments_message"
  | "send_carousel";

export type TemplateButton = {
  id: string;
  title: string;
};

export type ButtonTrigger = {
  type: "button";
  match: string;
  action: TemplateActionName;
};

export type TextTrigger = {
  type: "text";
  match: string[];
  action: TemplateActionName;
};

export type TemplateTrigger = ButtonTrigger | TextTrigger;

export type ChatTemplate = {
  id: string;
  name: string;
  entryAction: TemplateActionName;
  triggers: TemplateTrigger[];
  texts: {
    welcome: string;
  };
  buttons: TemplateButton[];
  fallbackAction: TemplateActionName;
};

export type NumberConfig = {
  phoneNumberId: string;
  tenantId: string;
  templateId: string;
  status: "active" | "inactive";
};