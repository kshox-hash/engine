"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tenantRepository = void 0;
const tenants = [
    {
        id: "1",
        businessName: "Peluquería Andrea",
        status: "active",
    },
    {
        id: "2",
        businessName: "Ferretería Norte",
        status: "active",
    },
];
exports.tenantRepository = {
    async findById(id) {
        return tenants.find(t => t.id === id);
    },
};
