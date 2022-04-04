import { redirect, Link } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/pet-supplies/db.server";
import LinkButton from "~/components/LinkButton.jsx";

export const loader = async function ({ params }) {
  const product = await fetch(
    `http://localhost:3000/api/pet-supplies/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async function ({ request, params }) {
  const form = await request.formData();

  if (form.get("_method") === "delete") {
    await fetch(`http://localhost:3000/api/pet-supplies/${params.productId}`, {
      method: "DELETE",
    });
    return redirect("/pet-supplies");
  }
};

export default function Post() {
  const product = useLoaderData();

  return (
    <div>
      <Breadcrumb links={[{ to: "/pet-supplies", title: "Pet supplies" }]} />
      <PageHeader title={product.title}>
        <LinkButton to={`/pet-supplies/edit/${product.id}`}>
          Edit product
        </LinkButton>
      </PageHeader>
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
