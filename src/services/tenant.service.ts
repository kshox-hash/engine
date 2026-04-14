import { tenantRepository } from "../repositories/tenant.repository";

export const tenantService = {
  async findById(id: string) {
    return tenantRepository.findById(id);
  },

  async getSubscription(tenantId: string) {
    return {
      tenantId,
      status: "active",
      maxMessages: 100,
    };
  },
};