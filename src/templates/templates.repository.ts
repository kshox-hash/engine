import { ChatTemplate } from "../types/templates.types";
import { templateMainMenu } from "./template.main.menu";

const templates: ChatTemplate[] = [templateMainMenu];

export const templatesRepository = {
  findById(templateId: string): ChatTemplate | undefined {
    return templates.find((template) => template.id === templateId);
  },
};