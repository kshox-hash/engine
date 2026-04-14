"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usageService = void 0;
const usageMap = new Map();
exports.usageService = {
    async getUsage(tenantId) {
        return {
            tenantId,
            messagesUsed: usageMap.get(tenantId) || 0,
        };
    },
    async increment(tenantId) {
        const current = usageMap.get(tenantId) || 0;
        usageMap.set(tenantId, current + 1);
    },
};
