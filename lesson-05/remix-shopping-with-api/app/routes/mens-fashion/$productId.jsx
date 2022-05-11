import { redirect, Link } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/mens-fashion/db.server";

export const loader = async function ({ params }) {
  const product = await fetch(
    `http://localhost:3000/api/mens-fashion/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    await fetch(`http://localhost:3000/api/mens-fashion/${params.productId}`, {
      method: "DELETE",
    });
    return redirect("/mens-fashion");
  }
};

export default function Post() {
  const product = useLoaderData();

  return (
    <div>
      <Breadcrumb links={[{ to: "/mens-fashion", title: "Mens Fashion" }]} />
      <PageHeader title={product.title} />
      <div className="flex">
        <img src={product.image} alt="Product image" className="w-3/12" />
        <div className="pl-4">
          <p className="font-extrabold">{product.description}</p>
          <p className="font-medium text-blue-800">{product.price} DKK</p>
        </div>
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
