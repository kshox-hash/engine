import { findPhoneNumberRepository, } from "../repositories/whatsapp-number.repository";


  export function findByPhoneNumberService(phoneNumber: string) {
    return findPhoneNumberRepository(phoneNumber)
  }

