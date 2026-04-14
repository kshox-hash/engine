import { whatsappNumberRepository } from "../repositories/whatsapp-number.repository";

export const whatsappNumberService = {
  async findByPhoneNumberId(phoneNumberId: string) {
    return whatsappNumberRepository.findByPhoneNumberId(phoneNumberId);
  },

  async findByTenantId(tenantId: string) {
    return whatsappNumberRepository.findByTenantId(tenantId);
  },
};