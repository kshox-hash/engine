import DB from "../db/db_configuration";

export async function getTemplateRepository(templateId: string) {
  const res = await DB.getPool().query(
    `
    SELECT template_id
    FROM users
    WHERE template_id = $1
    LIMIT 1
    `,
    [templateId]
  );

  return res.rowCount ? res.rows[0] : null;
}