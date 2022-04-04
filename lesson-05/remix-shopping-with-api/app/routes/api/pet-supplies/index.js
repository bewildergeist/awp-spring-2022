import { redirect } from "remix";
import db from "~/db/pet-supplies/db.server.js";
import { json } from "remix";

export async function loader() {
  return db.data.products ?? [];
}

export async function action({ request }) {
  const body = await request.json();
  console.log(body);
  db.data.products.push(body);
  db.write();
  return json(body, {
    status: 201,
  });
}
