import { redirect, Link } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/music/db.server";

export const loader = async function ({ params }) {
  const product = await fetch(
    `http://localhost:3000/api/music/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    await fetch(`http://localhost:3000/api/music/${params.productId}`, {
      method: "DELETE",
    });
    return redirect("/music");
  }
};

export default function Post() {
  const product = useLoaderData();

  return (
    <div>
      <Breadcrumb links={[{ to: "/music", title: "Music" }]} />
      <PageHeader title={product.title} />
      <h3 className="mb-3 ">{product.artist}</h3>

      <img className="w-96" src={product.img} />

      <form method="post" className="mt-5 pt-2 border-t border-gray-200">
        <input type="hidden" name="_method" value="delete" />
        <Button type="submit" destructive>
          Delete
        </Button>

        <Link to={`edit`} className="font-semibold">
          <h3>EDIT</h3>
        </Link>
      </form>
    </div>
  );
}
