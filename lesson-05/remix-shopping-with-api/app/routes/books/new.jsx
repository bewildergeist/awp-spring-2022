import { Link, redirect, Form, useActionData, json } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/books/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const image = form.get("image");

  const errors = {};
  if(!title) errors.title = true;
  if(!description) errors.description = true;
  if(!image) errors.image = true;

  if(Object.keys(errors).length) {
    return json(errors);
  }

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
  const errors = useActionData();
  const errorMessage = <em style={{ color: "red" }}>This field is required</em>;

  return (
    <>
      <Breadcrumb links={[{ to: "/books", title: "Books" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <Form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
          />
          {errors?.title ? (
            errorMessage
            ) : null}
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"></textarea>
            {errors?.description ? (
            errorMessage
            ) : null}
            <Label htmlFor="image">Image Url</Label>
          <input
            type="text"
            name="image"
            id="image"
            className="border p-1 border-gray-200 w-full"
          />
          {errors?.image ? (
            errorMessage
            ) : null}
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </Form>
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
