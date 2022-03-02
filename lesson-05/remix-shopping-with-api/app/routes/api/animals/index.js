import db from "~/db/animals/db.server.js";

export async function loader({params}) {
  return db.data.animals ?? [];
}

