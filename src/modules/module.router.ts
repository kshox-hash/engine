import { chatbotModule } from "./chatbot.module";

export const moduleRouter = {
  async handle(context: any) {
    return chatbotModule.handle(context);
  },
};