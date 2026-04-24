import DB from "../db/db_configuration";

export async function findPhoneNumberRepository(phoneNumber: string) {
  const res = await DB.getPool().query(
    `
    SELECT phone_number_id, template_id
    FROM users
    WHERE phone_number_id = $1
    LIMIT 1
    `,
    [phoneNumber]
  );

  return res.rowCount ? res.rows[0] : null;
}


const whatsappNumbers = [
  {
    id: "n1",
    tenantId: "1",
    phoneNumberId: "123",
    displayPhoneNumber: "930700173",
    wabaId: "waba_1",
    accessToken: "token_1",
    status: "active",
  },
  {
    id: "n2",
    tenantId: "1",
    phoneNumberId: "456",
    displayPhoneNumber: "56922222222",
    wabaId: "waba_2",
    accessToken: "token_2",
    status: "active",
  },
  {
    id: "n3",
    tenantId: "2",
    phoneNumberId: "789",
    displayPhoneNumber: "56933333333",
    wabaId: "waba_3",
    accessToken: "token_3",
    status: "active",
  },
];

export const whatsappNumberRepository = {
  async findByPhoneNumberId(phoneNumberId: string) {
    return whatsappNumbers.find(n => n.phoneNumberId === phoneNumberId);
  },

  async findByTenantId(tenantId: string) {
    return whatsappNumbers.filter(n => n.tenantId === tenantId);
  },
};