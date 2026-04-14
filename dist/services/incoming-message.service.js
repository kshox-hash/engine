"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incomingMessageService = void 0;
const tenant_service_1 = require("./tenant.service");
const whatsapp_number_service_1 = require("./whatsapp-number.service");
const usage_service_1 = require("./usage.service");
const session_service_1 = require("./session.service");
const module_router_1 = require("../modules/module.router");
exports.incomingMessageService = {
    async process(event) {
        const whatsappNumber = await whatsapp_number_service_1.whatsappNumberService.findByPhoneNumberId(event.phoneNumberId);
        if (!whatsappNumber) {
            console.log("❌ Número de WhatsApp no encontrado");
            return;
        }
        const tenant = await tenant_service_1.tenantService.findById(whatsappNumber.tenantId);
        if (!tenant) {
            console.log("❌ Tenant no encontrado");
            return;
        }
        const subscription = await tenant_service_1.tenantService.getSubscription(tenant.id);
        if (!subscription || subscription.status !== "active") {
            console.log("⛔ Suscripción inactiva");
            return;
        }
        const usage = await usage_service_1.usageService.getUsage(tenant.id);
        if (usage.messagesUsed >= subscription.maxMessages) {
            console.log("🚫 Límite alcanzado");
            return;
        }
        const session = await session_service_1.sessionService.getOrCreate(tenant.id, event.from);
        const context = {
            tenant,
            whatsappNumber,
            subscription,
            usage,
            session,
            event,
        };
        await module_router_1.moduleRouter.handle(context);
        await usage_service_1.usageService.increment(tenant.id);
    },
};
