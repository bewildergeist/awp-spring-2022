import db from "~/db/electronics/db.server.js";

export async function loader() {
  return db.data.products ?? [];
}

export async function action({request}) {
  switch(request.method) {
    case "POST":
      const body = await request.json();
      db.data.products?.push(body);
      db.write();
      return json(body, {
        status: 201,
      });
  }
}
