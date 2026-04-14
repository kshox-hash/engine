import { NumberConfig } from "../types/templates.types";

const numbers: NumberConfig[] = [
  {
    phoneNumberId: "1073228822532872",
    tenantId: "tenant_1",
    templateId: "template_main_menu",
    status: "active",
  },
  {
    phoneNumberId: "1032212863314372",
    tenantId: "tenant_2",
    templateId: "template_main_menu",
    status: "active",
  },
];

export const numbersRepository = {
  findByPhoneNumberId(phoneNumberId: string): NumberConfig | undefined {
    return numbers.find((number) => number.phoneNumberId === phoneNumberId);
  },
};