<<<<<<< Updated upstream
import { Form, redirect, useActionData, json  } from "remix";
import { Link, redirect } from "remix";
=======
import { Form, redirect, useActionData, json, useTransition } from "remix";
>>>>>>> Stashed changes
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/electronics/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const image = form.get("image");
  const uuid = new Date().getTime().toString(16);

  const errors = {};
  if (!title) errors.title = "title required";
  if (title.length < 3) errors.title = "title too short"
  if (!description) errors.description = "description required";
  if (description.length < 10) errors.description = "description too short"
  if (!image) errors.image = "image required";
  if (!image.match(/\.(jpeg|jpg|gif|png)$/)) errors.image = "not an image";


  if (Object.keys(errors).length) {
    const values = Object.fromEntries(form);
    return json({ errors, values });
  }

  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1000);
  });

  const uuid = new Date().getTime().toString(16);
  // TODO: Make a POST request via fetch to an API route that receives JSON data
  // and creates the product in the db
  await fetch("http://localhost:3000/api/electronics/", {
    method: "POST",
    body: JSON.stringify({ title, description, image, id: uuid }),
    body: JSON.stringify({ title, description, id: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect(`/electronics`);
};


export default function NewProduct() {
  const actionData = useActionData();
export default function NewProduct() {
  return (
    <>
      <Breadcrumb links={[{ to: "/eletronics", title: "Electronics" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <Form method="post" className="w-64">
          <Label required htmlFor="title">Title</Label>
        <form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
            defaultValue={actionData?.values.title}
          />
                {actionData?.errors.title ? (
        <p style={{ color: "red" }}>
          {actionData.errors.title}
        </p>
      ) : null}
          />
          <Label htmlFor="description">Description</Label>
          <textarea
            name="description"
            id="description"
            className="border p-1 border-gray-200 w-full"
            defaultValue={actionData?.values.description}
          ></textarea>
                {actionData?.errors.description ? (
        <p style={{ color: "red" }}>
          {actionData.errors.description}
        </p>
      ) : null}
          <Label htmlFor='image'>image link</Label>
          <input
            type='text'
            name='image'
            id='image'
            defaultValue={actionData?.values.image}
          ></input>
                {actionData?.errors.image ? (
        <p style={{ color: "red" }}>
          {actionData.errors.image}
        </p>
      ) : null}
          <div className="mt-3">
            <button class="blueButton"
              type="submit"
              disabled={isAdding}
              name="_action"
              value="create"
            >
              {isAdding ? "Adding product..." : "Add product"}
              </button>
          </div>
        </Form>
          ></textarea>
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </form>
