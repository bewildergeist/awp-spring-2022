import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/mens-fashion/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const price = form.get("price");
  const image = form.get("image");

  const uuid = new Date().getTime().toString(16);
  // TODO: Make a POST request via fetch to an API route that receives JSON data
  // and creates the product in the db
  await fetch("http://localhost:3000/api/mens-fashion/", {
    method: "POST",
    body: JSON.stringify({ title, description, image, price, id: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect(`/mens-fashion/${uuid}`);
};

export default function NewProduct() {
  return (
    <>
      <Breadcrumb links={[{ to: "/mens-fashion", title: "Men's fashion" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <form method="post" className="w-64">
          <Label htmlFor="title">Brand</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="title">Price</Label>
          <input
            type="number"
            name="price"
            id="price"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="title">Image url</Label>
          <input
            type="text"
            name="image"
            id="image"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
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
