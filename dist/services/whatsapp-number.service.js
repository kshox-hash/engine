"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.whatsappNumberService = void 0;
const whatsapp_number_repository_1 = require("../repositories/whatsapp-number.repository");
exports.whatsappNumberService = {
    async findByPhoneNumberId(phoneNumberId) {
        return whatsapp_number_repository_1.whatsappNumberRepository.findByPhoneNumberId(phoneNumberId);
    },
    async findByTenantId(tenantId) {
        return whatsapp_number_repository_1.whatsappNumberRepository.findByTenantId(tenantId);
    },
};
