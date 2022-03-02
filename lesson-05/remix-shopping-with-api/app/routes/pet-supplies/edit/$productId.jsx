import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/pet-supplies/db.server";
import { useLoaderData } from "remix";

export const loader = async ({ params }) => {
  const product = await fetch(
    `http://localhost:3000/api/pet-supplies/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");

  await fetch(`http://localhost:3000/api/pet-supplies/${params.productId}`, {
    method: "PUT",
    body: JSON.stringify({ title, description, id: params.productId }),
    headers: {
      "Content-type": "application/json",
    },
  });

  //const data = await response.json();
  return redirect(`/pet-supplies/${params.productId}`);
};

export default function EditProduct() {
  const product = useLoaderData();
  return (
    <>
      <Breadcrumb links={[{ to: "/pet-supplies", title: "Pet supplies" }]} />
      <PageHeader title="Edit product" subtitle="Make it a good one" />
      <div>
        <form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            defaultValue={product.title}
            id="title"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            defaultValue={product.description}
            className="border p-1 border-gray-200 w-full"
          ></textarea>
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </form>
      </div>
    </>
  );
}

function Label({ children, ...rest }) {
  return (
    <label className="block font-semibold mt-3 mb-1" {...rest}>
      {children}
    </label>
  );
}
