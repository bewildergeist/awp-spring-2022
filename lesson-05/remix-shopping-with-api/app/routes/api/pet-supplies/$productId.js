import db from "~/db/pet-supplies/db.server.js";
import { json } from "remix";
export async function loader({ params }) {
  const product = db.data.products?.find((p) => p.id === params.productId);
  return product;
}

export async function action({ params, request }) {
  if (request.method === "DELETE") {
    db.data.products = db.data.products.filter(
      (p) => p.id !== params.productId
    );
    db.write();
    return json(body, {
      status: 201,
    });
  } else if (request.method === "PUT") {
    const body = await request.json();
    db.data.products.map((product) => {
      if (product.id === body.id) {
        product.title = body.title;
        product.description = body.description;
      }
    });
    db.write();
    return json(body, {
      status: 201,
    });
  }
}
