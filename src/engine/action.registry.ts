import { Message } from "../models/message";

import { MessageService } from "../services/message.service";

import {
  ChatTemplate,
  TemplateActionName
} from "../types/templates.types";


/*
=========================================================
CONTEXTO GLOBAL DE ACCIONES
=========================================================
Información que cualquier acción puede necesitar.
=========================================================
*/
type ActionContext = {

  // Template actual del chatbot
  template: ChatTemplate;

  // Mensaje recibido
  message: Message;

  // Número de WhatsApp receptor
  senderPhoneNumberId: string;

  // Número del usuario que escribió
  recipientPhoneNumber: string;

  // Usuario/tenant dueño del bot
  userId: string;
};


/*
=========================================================
TIPO DE HANDLER DE ACCIÓN
=========================================================
Cada acción recibe contexto
y devuelve una Promise.
=========================================================
*/
type ActionHandler = (
  context: ActionContext
) => Promise<unknown>;


/*
=========================================================
MAPA DE ACCIONES
=========================================================
Cada key representa un actionName.

El value es la función que ejecuta
la lógica correspondiente.
=========================================================
*/
const actions: Record<
  TemplateActionName,
  ActionHandler
> = {


  /*
  =========================================================
  ENVÍA MENÚ PRINCIPAL
  =========================================================
  */
  send_main_menu: async (context) => {

    const {
      template,
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
    } = context;

    return MessageService.sendWelcomeButtonsMessage(

      // ID del mensaje recibido
      message.id,

      // Número receptor del bot
      senderPhoneNumberId,

      // Usuario destinatario
      recipientPhoneNumber,

      // Texto principal del menú
      template.texts.welcome,

      // Botones del template
      template.buttons
    );
  },


  /*
  =========================================================
  ENVÍA MENSAJE DE CHATBOX
  =========================================================
  */
  send_chatbox_message: async (context) => {

    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber
    } = context;

    return MessageService.sendChatboxMessage(

      message.id,

      senderPhoneNumberId,

      recipientPhoneNumber
    );
  },


  /*
  =========================================================
  ENVÍA MENSAJE DE CONTACTO
  =========================================================
  */
  send_contact_message: async (context) => {

    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber
    } = context;

    return MessageService.sendContactMessage(

      message.id,

      senderPhoneNumberId,

      recipientPhoneNumber
    );
  },


  /*
  =========================================================
  ENVÍA LINK RUNTIME DE COTIZACIÓN
  =========================================================
  */
  send_quote_runtime_link: async (context) => {

    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
      userId,
    } = context;

    return MessageService.sendQuoteRuntimeLinkMessage(

      message.id,

      senderPhoneNumberId,

      recipientPhoneNumber,

      userId
    );
  },


  /*
  =========================================================
  ENVÍA MENSAJE DE SOPORTE
  =========================================================
  */
  send_support_message: async (context) => {

    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber
    } = context;

    return MessageService.sendSupportMessage(

      message.id,

      senderPhoneNumberId,

      recipientPhoneNumber
    );
  },


  /*
  =========================================================
  ENVÍA MENSAJE DE RESERVAS
  =========================================================
  */
  send_appointments_message: async (context) => {

    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber
    } = context;

    return MessageService.sendAppointmentsMessage(

      message.id,

      senderPhoneNumberId,

      recipientPhoneNumber
    );
  },


  /*
  =========================================================
  ENVÍA CARRUSEL DE WHATSAPP
  =========================================================
  */
  send_carousel: async (context) => {

    const {
      message,
      senderPhoneNumberId,
      recipientPhoneNumber,
      userId,
    } = context;

    return MessageService.sendCarousel(

      message.id,

      senderPhoneNumberId,

      recipientPhoneNumber,

      // nombre interno del carrusel
      "automatiza_carousel_v3",

      userId
    );
  },
};


/*
=========================================================
ACTION REGISTRY
=========================================================
Responsabilidad:
- buscar acción
- ejecutar acción
=========================================================
*/
export const actionRegistry = {

  async execute(

    // Nombre de la acción a ejecutar
    actionName: TemplateActionName,

    // Contexto global de ejecución
    context: ActionContext

  ): Promise<unknown> {


    /*
    =========================================================
    BUSCA LA ACCIÓN EN EL MAPA
    =========================================================
    */
    const action = actions[actionName];


    /*
    =========================================================
    SI LA ACCIÓN NO EXISTE
    → ERROR
    =========================================================
    */
    if (!action) {

      throw new Error(
        `Unsupported action: ${actionName}`
      );
    }


    /*
    =========================================================
    EJECUTA ACCIÓN
    =========================================================
    */
    return action(context);
  },
};