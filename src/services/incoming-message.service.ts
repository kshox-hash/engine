import { tenantService } from "./tenant.service";
import { whatsappNumberService } from "./whatsapp-number.service";
import { usageService } from "./usage.service";
import { sessionService } from "./session.service";


export const incomingMessageService = {
  async process(event: any) {
    const whatsappNumber = await whatsappNumberService.findByPhoneNumberId(
      event.phoneNumberId
    );

    if (!whatsappNumber) {
      console.log("❌ Número de WhatsApp no encontrado");
      return;
    }

    const tenant = await tenantService.findById(whatsappNumber.tenantId);

    if (!tenant) {
      console.log("❌ Tenant no encontrado");
      return;
    }

    const subscription = await tenantService.getSubscription(tenant.id);

    if (!subscription || subscription.status !== "active") {
      console.log("⛔ Suscripción inactiva");
      return;
    }

    const usage = await usageService.getUsage(tenant.id);

    if (usage.messagesUsed >= subscription.maxMessages) {
      console.log("🚫 Límite alcanzado");
      return;
    }

    const session = await sessionService.getOrCreate(
      tenant.id,
      event.from
    );

    await usageService.increment(tenant.id);
  },
};