const sessions = new Map<string, any>();

export const sessionService = {
  async getOrCreate(tenantId: string, phone: string) {
    const key = `${tenantId}-${phone}`;

    if (!sessions.has(key)) {
      sessions.set(key, { step: "start", data: {} });
    }

    return sessions.get(key);
  },
};