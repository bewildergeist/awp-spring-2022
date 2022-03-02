import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/toys/db.server";

export const action = async ({ request, params }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const price = form.get("price");
  const image = form.get("image");
  const category = form.get("category");
  const rating = form.get("rating");

  // if (form.get("_method") === "put") {
  await fetch(`http://localhost:3000/api/toys/${params.productId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      description,
      price,
      image,
      category,
      rating,
      id: params.productId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect(`/toys/${params.productId}`);
};
// };

export default function UpdateProduct() {
  return (
    <>
      <Breadcrumb links={[{ to: "/toys", title: "Toys" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="category">Category</Label>
          <input
            type="text"
            name="category"
            id="category"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"
          ></textarea>

          <Label htmlFor="image">Image</Label>
          <input
            type="text"
            name="image"
            id="image"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="rating">Rating</Label>
          <input
            type="text"
            name="rating"
            id="rating"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="price">Price</Label>
          <input
            type="text"
            name="price"
            title="price"
            className="border p-1 border-gray-200 w-full"
          />
          <input type="hidden" name="_method" value="put" />
          <div className="mt-3">
            <Button type="submit">Update product</Button>
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
