"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numbersRepository = void 0;
const numbers = [
    {
        phoneNumberId: "123456789",
        tenantId: "tenant_1",
        templateId: "template_main_menu",
        status: "active",
    },
    {
        phoneNumberId: "987654321",
        tenantId: "tenant_2",
        templateId: "template_main_menu",
        status: "active",
    },
];
exports.numbersRepository = {
    findByPhoneNumberId(phoneNumberId) {
        return numbers.find((number) => number.phoneNumberId === phoneNumberId);
    },
};
