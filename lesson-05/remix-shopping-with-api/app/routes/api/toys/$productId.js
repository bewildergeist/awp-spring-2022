import { json } from "remix";
import db from "~/db/toys/db.server.js";

export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}

export async function action({ request, params }) {
  switch (request.method) {
    case "PUT": {
      const body = await request.json();
      db.data.products = db.data.products.map((p) => {
        if (p.id == params.productId) {
          return body;
        } else {
          return p;
        }
      });
      db.write();
      return json(body, {
        status: 202,
      });
    }
    case "DELETE": {
      db.data.products = db.data.products.filter(
        (p) => p.id !== params.productId
      );
      db.write();
      return new Response(null, { status: 204 });
    }
  }
}
