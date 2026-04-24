import { findPhoneNumberRepository, whatsappNumberRepository } from "../repositories/whatsapp-number.repository";


  export function findByPhoneNumberService(phoneNumber: string) {
    return findPhoneNumberRepository(phoneNumber)
  }

  export function findByTenantId(tenantId: string) {
    return whatsappNumberRepository.findByTenantId(tenantId);
};