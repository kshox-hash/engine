import DB from "../db/db_configuration";

export async function findPhoneNumberRepository(phoneNumberId: string) {
  const res = await DB.getPool().query(
    `
    SELECT 
      id, 
      phone_number_id, 
      template_id,
      company_name
    FROM users
    WHERE phone_number_id = $1
    LIMIT 1
    `,
    [phoneNumberId]
  );

  return res.rowCount ? res.rows[0] : null;
}