import db from "~/db/music/db.server.js";

export async function loader() {
  return db.data.products ?? [];
}

export async function action({ request, params }) {
  switch (request.method) {
    case "POST": {
      const body = await request.json();
      db.data.products?.push(body);
      db.write();
      return json(body, {
        status: 201,
      });
    }
  }
}
