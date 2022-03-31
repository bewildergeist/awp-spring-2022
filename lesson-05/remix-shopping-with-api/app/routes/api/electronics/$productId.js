// import { json } from "build";
import db from "~/db/electronics/db.server.js";

export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}
export async function action({ request, params }) {
  switch (request.method) {
    case "DELETE": {
      db.data.products = db.data.products.filter(
        (p) => p.id !== params.productId
      );
      db.write();
      return new Response(null, { status: 204 });
    }
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
