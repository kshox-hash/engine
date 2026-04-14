"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappNumberRepository = void 0;
const whatsappNumbers = [
    {
        id: "n1",
        tenantId: "1",
        phoneNumberId: "123",
        displayPhoneNumber: "+56911111111",
        wabaId: "waba_1",
        accessToken: "token_1",
        status: "active",
    },
    {
        id: "n2",
        tenantId: "1",
        phoneNumberId: "456",
        displayPhoneNumber: "+56922222222",
        wabaId: "waba_2",
        accessToken: "token_2",
        status: "active",
    },
    {
        id: "n3",
        tenantId: "2",
        phoneNumberId: "789",
        displayPhoneNumber: "+56933333333",
        wabaId: "waba_3",
        accessToken: "token_3",
        status: "active",
    },
];
exports.whatsappNumberRepository = {
    async findByPhoneNumberId(phoneNumberId) {
        return whatsappNumbers.find(n => n.phoneNumberId === phoneNumberId);
    },
    async findByTenantId(tenantId) {
        return whatsappNumbers.filter(n => n.tenantId === tenantId);
    },
};
