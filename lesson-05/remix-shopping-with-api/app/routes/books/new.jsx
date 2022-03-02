import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/books/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const image = form.get("image");

  const uuid = new Date().getTime().toString(16);
  await fetch("http://localhost:3000/api/books", {
    method: "POST",
    body: JSON.stringify({title, description, image, id: uuid}),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return redirect(`/books`);
};

export default function NewProduct() {
  return (
    <>
      <Breadcrumb links={[{ to: "/books", title: "Books" }]} />
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
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"></textarea>
            <Label htmlFor="image">Image Url</Label>
          <input
            type="text"
            name="image"
            id="image"
            className="border p-1 border-gray-200 w-full"
          />
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
