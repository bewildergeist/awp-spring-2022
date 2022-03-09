import { redirect, Link } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/electronics/db.server";

export const loader = async function ({ params }) {
  const product = await fetch(
    `http://localhost:3000/api/electronics/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    // TODO: Create an API route and send a DELETE request to it
    await fetch(`http://localhost:3000/api/electronics/${params.productId}`, {
      method: "DELETE",
    });
    return redirect("/electronics");
  }
};

export default function Post() {
  const product = useLoaderData();

  return (
    <div>
      <Breadcrumb links={[{ to: "/electronics", title: "Electronics" }]} />
      <PageHeader title={product.title} />
      <p>{product.description}</p>
      <div className="flex items-center flex-col">
        <img className="object-scale-down" src={product.image} />
      </div>
      <form method="post" className="mt-5 pt-2 border-t border-gray-200">
        <input type="hidden" name="_method" value="delete" />
        <Button type="submit" destructive>
          Delete
        </Button>
      </form>
    </div>
  );
}
