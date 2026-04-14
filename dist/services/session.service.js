"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionService = void 0;
const sessions = new Map();
exports.sessionService = {
    async getOrCreate(tenantId, phone) {
        const key = `${tenantId}-${phone}`;
        if (!sessions.has(key)) {
            sessions.set(key, { step: "start", data: {} });
        }
        return sessions.get(key);
    },
};
