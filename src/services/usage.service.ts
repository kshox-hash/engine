const usageMap = new Map<string, number>();

export const usageService = {
  async getUsage(tenantId: string) {
    return {
      tenantId,
      messagesUsed: usageMap.get(tenantId) || 0,
    };
  },

  async increment(tenantId: string) {
    const current = usageMap.get(tenantId) || 0;
    usageMap.set(tenantId, current + 1);
  },
};