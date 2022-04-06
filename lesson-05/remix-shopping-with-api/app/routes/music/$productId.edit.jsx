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

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const title = form.get("title");
  const artist = form.get("artist");
  const img = form.get("img");
  await fetch(`http://localhost:3000/api/music/${params.productId}`, {
    method: "PUT",
    body: JSON.stringify({ id: params.productId, artist, title, img }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect(`/music/${params.productId}`);
};

export default function EditProduct() {
  const product = useLoaderData();
  return (
    <>
      <Breadcrumb links={[{ to: "/music", title: "Music" }]} />
      <PageHeader title="Edit Album" subtitle="Make it a good one" />
      <div>
        <form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={product.title}
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="artist">Artist</Label>
          <input
            type="text"
            name="artist"
            id="artist"
            defaultValue={product.artist}
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="img">Image</Label>
          <input
            type="text"
            name="img"
            id="img"
            defaultValue={product.img}
            className="border p-1 border-gray-200 w-full"
          />
          <div className="mt-3">
            <Button type="submit">Edit Album</Button>
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
