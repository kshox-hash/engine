"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantService = void 0;
const tenant_repository_1 = require("../repositories/tenant.repository");
exports.tenantService = {
    async findById(id) {
        return tenant_repository_1.tenantRepository.findById(id);
    },
    async getSubscription(tenantId) {
        return {
            tenantId,
            status: "active",
            maxMessages: 100,
        };
    },
};
