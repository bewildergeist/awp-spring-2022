import { redirect, Link } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/toys/db.server";

export const loader = async function ({ params }) {
  const product = await fetch(
    `http://localhost:3000/api/toys/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    await fetch(`http://localhost:3000/api/toys/${params.productId}`, {
      method: "DELETE",
    });
    return redirect("/toys");
  }
};

export default function Post() {
  const product = useLoaderData();

  return (
    <div>
      <div className="flex">
        <img src={product.image} alt={product.imageAlt} />
        <div className="details p-10">
          <Breadcrumb links={[{ to: "/toys", title: "Toys" }]} />
          <PageHeader title={product.title} />
          <h3 className="font-bold text-lg">{product.price}$</h3>
          <p className="font-bold">
            Reviews: <span className="font-normal">{product.rating}</span>
          </p>

          <p className="font-bold">
            Category: <span className="font-normal">{product.category}</span>
          </p>
          <p>{product.description}</p>
          <form method="post" className="mt-5 pt-2 border-t border-gray-200">
            <input type="hidden" name="_method" value="delete" />
            <Button type="submit" destructive>
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
