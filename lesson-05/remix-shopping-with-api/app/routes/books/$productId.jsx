import { redirect, Link } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/books/db.server";

export const loader = async function ({ params }) {
  const product = await fetch(
    `http://localhost:3000/api/books/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    await fetch(`http://localhost:3000/api/books/${params.productId}`, {
    method: "DELETE",
  });
  }
    return redirect("/books");
};

export default function Post() {
  const product = useLoaderData();

  return (
    <div>
      <Breadcrumb links={[{ to: "/books", title: "Books" }]} />
      <PageHeader title={product.title} />
      <img src={product.image} alt="" />
      <p>{product.description}</p>
      <form method="post" className="mt-5 pt-2 border-t border-gray-200">
        <input type="hidden" name="_method" value="delete" />
        <Button type="submit" destructive>
          Delete
        </Button>
      </form>
    </div>
  );
}
