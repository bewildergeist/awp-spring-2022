import db from "~/db/electronics/db.server.js";

export async function loader() {
  return db.data.products ?? [];
}
