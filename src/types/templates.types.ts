export type TemplateActionName =
  | "send_main_menu"
  | "send_services_link"
  | "send_contact_message";

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