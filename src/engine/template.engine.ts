import { Message } from "../models/message";

import { actionRegistry } from "./action.registry";

import { ChatTemplate } from "../types/templates.types";




// Limpia texto:
// - evita undefined/null
// - elimina espacios
// - convierte a minúsculas
function normalizeText(text: string): string {

  return String(text || "")
    .trim()
    .toLowerCase();
}


// Limpia payload de botones:
// - evita undefined/null
// - elimina espacios
function normalizePayload(payload: string): string {

  return String(payload || "")
    .trim();
}


// Limpia número telefónico:
// - evita undefined/null
// - elimina espacios
function normalizePhoneNumber(phoneNumber: string): string {

  return String(phoneNumber || "")
    .trim();
}


/*
=========================================================
RESOLVER TRIGGER
=========================================================
Decide qué trigger corresponde al mensaje entrante.

Puede resolver:
- botones
- texto
- futuros tipos de triggers
=========================================================
*/
function resolveTrigger(
  template: ChatTemplate,
  message: Message
) {

  // Texto normalizado del mensaje
  const incomingText = normalizeText(message.text);

  // Payload normalizado del botón
  const incomingPayload = normalizePayload(message.payload);


  /*
  =========================================================
  BUSCAR TRIGGER DE BOTÓN
  =========================================================
  */

  if (incomingPayload) {

    const buttonTrigger = template.triggers.find(

      (trigger) =>

        trigger.type === "button" &&
        trigger.match === incomingPayload
    );

    // Si encuentra trigger → lo devuelve
    if (buttonTrigger) {
      return buttonTrigger;
    }
  }


  /*
  =========================================================
  BUSCAR TRIGGER DE TEXTO
  =========================================================
  */

  if (incomingText) {

    const textTrigger = template.triggers.find(

      (trigger) =>

        trigger.type === "text" &&
        trigger.match.includes(incomingText)
    );

    // Si encuentra trigger → lo devuelve
    if (textTrigger) {
      return textTrigger;
    }
  }


  /*
  =========================================================
  SI NO ENCUENTRA NINGÚN TRIGGER
  =========================================================
  */

  return null;
}


/*
=========================================================
TEMPLATE ENGINE
=========================================================
Motor principal que procesa templates.

Responsabilidades:
- crear contexto
- resolver trigger
- ejecutar acción
- ejecutar fallback
=========================================================
*/
export class TemplateEngine {

  static async handle(

    params: {

      template: ChatTemplate;

      message: Message;

      senderPhoneNumberId: string;

      userId: string;
    }

  ): Promise<unknown> {


    /*
    =========================================================
    EXTRAER PARÁMETROS
    =========================================================
    */

    const {
      template,
      message,
      senderPhoneNumberId,
      userId,
    } = params;


    /*
    =========================================================
    LIMPIAR NÚMERO TELEFÓNICO
    =========================================================
    */

    const recipientPhoneNumber = normalizePhoneNumber(
      message.senderPhoneNumber
    );


    /*
    =========================================================
    CONTEXTO GLOBAL DEL TEMPLATE
    =========================================================
    Información que las acciones pueden necesitar.
    =========================================================
    */

    const context = {

      template,

      message,

      senderPhoneNumberId,

      recipientPhoneNumber,

      userId,
    };


    /*
    =========================================================
    RESOLVER TRIGGER
    =========================================================
    Decide qué trigger corresponde al mensaje.
    =========================================================
    */

    const trigger = resolveTrigger(
      template,
      message
    );


    /*
    =========================================================
    SI EXISTE TRIGGER
    → EJECUTA SU ACCIÓN
    =========================================================
    */

    if (trigger) {

      return actionRegistry.execute(
        trigger.action,
        context
      );
    }


    /*
    =========================================================
    FALLBACK
    =========================================================
    Si no encontró trigger,
    ejecuta acción por defecto.
    =========================================================
    */

    return actionRegistry.execute(
      template.fallbackAction,
      context
    );
  }
}