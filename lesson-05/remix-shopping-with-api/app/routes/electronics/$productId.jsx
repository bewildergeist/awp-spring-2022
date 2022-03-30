import { redirect, Link, useTransition, Form } from "remix";
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
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1000);
    });

    // TODO: Create an API route and send a DELETE request to it
    await fetch(`http://localhost:3000/api/electronics/${params.productId}`, {
      method: "DELETE",
    });
    return redirect("/electronics");
  }
};

export default function Post() {
  const product = useLoaderData();
  let transition = useTransition();
  let isDeleting =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "delete";
  return (
    <div className={isDeleting ? "opacity-75" : ""}>
      <Breadcrumb links={[{ to: "/electronics", title: "Electronics" }]} />
      <PageHeader title={product.title} />
      <p>{product.description}</p>
      <div className="flex items-center flex-col">
        <img className="object-scale-down" src={product.image} />
      </div>
      <Form method="post" className="mt-5 pt-2 border-t border-gray-200">
        <input type="hidden" name="_method" value="delete" />
        <button
          type="submit"
          destructive
          disabled={isDeleting}
          name="_action"
          value="delete"
          className="deleteButton"
        >
          {isDeleting ? "Deleting product..." : "Delete product"}
        </button>
      </Form>
    </div>
  );
}
