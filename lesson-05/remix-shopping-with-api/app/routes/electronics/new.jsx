import { Form, redirect, useActionData, json, useTransition } from "remix";
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

  // TODO: Make a POST request via fetch to an API route that receives JSON data
  // and creates the product in the db
  await fetch("http://localhost:3000/api/electronics/", {
    method: "POST",
    body: JSON.stringify({ title, description, image, id: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect(`/electronics`);
};


export default function NewProduct() {
  const actionData = useActionData();
  let transition = useTransition();
  let isAdding = transition.state === "submitting" && transition.submission.formData.get("_action") === "create";
  return (
    <>
      <Breadcrumb links={[{ to: "/eletronics", title: "Electronics" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <Form method="post" className="w-64">
          <Label required htmlFor="title">Title</Label>
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
