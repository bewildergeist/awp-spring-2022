import { json } from "body-parser";
import db from "~/db/mens-fashion/db.server.js";

export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}

export async function action({ request, params }) {
  switch (request.method) {
    case "PUT": {
      /* handle "PUT" */
    }
    case "PATCH": {
      /* handle "PATCH" */
    }
    case "DELETE": {
      /* handle "DELETE" */
      db.data.products = db.data.products.filter(
        (p) => p.id !== params.productId
      );
      db.write();
      return new Response(null, { status: 204 });
    }
  }
}
