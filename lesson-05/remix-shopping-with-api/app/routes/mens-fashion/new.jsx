import { Form, json, redirect, useActionData, useTransition } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import { useEffect, useState } from "react";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");
  const image = formData.get("image");
  const price = formData.get("price");

  const errors = {};
  if (!title) errors.title = true;
  if (!price) errors.price = true;
  if (!image) errors.image = true;
  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

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
  const actionData = useActionData();
  const transition = useTransition();

  return (
    <>
      <Breadcrumb links={[{ to: "/mens-fashion", title: "Men's fashion" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <Form method="post" className="w-64">
          <fieldset disabled={transition.state === "submitting"}>
            <Label htmlFor="title">Brand</Label>
            <input
              style={{
                borderColor: actionData?.errors.title ? "red" : "",
              }}
              defaultValue={actionData?.values.title}
              type="text"
              name="title"
              id="title"
              className="border p-1 border-gray-200 w-full"
            />
            {actionData?.errors.title ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error="Add a title"
              />
            ) : null}
            <Label htmlFor="title">Price</Label>
            <input
              style={{
                borderColor: actionData?.errors.price ? "red" : "",
              }}
              defaultValue={actionData?.values.price}
              type="number"
              name="price"
              id="price"
              className="border p-1 border-gray-200 w-full"
            />
            {actionData?.errors.price ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error="Add a price"
              />
            ) : null}
            <Label htmlFor="title">Image url</Label>
            <input
              style={{
                borderColor: actionData?.errors.image ? "red" : "",
              }}
              defaultValue={actionData?.values.image}
              type="text"
              name="image"
              id="image"
              className="border p-1 border-gray-200 w-full"
            />
            {actionData?.errors.image ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error="Add an image"
              />
            ) : null}
            <Label htmlFor="description">Description</Label>
            <textarea
              style={{
                borderColor: actionData?.errors.description ? "red" : "",
              }}
              defaultValue={actionData?.values.description}
              name="description"
              id="description"
              className="border p-1 border-gray-200 w-full"
            ></textarea>
            {actionData?.errors.description ? (
              <ValidationMessage
                isSubmitting={transition.state === "submitting"}
                error="Add a description"
              />
            ) : null}
            <div className="mt-3">
              <Button type="submit">
                {transition.state === "submitting" ? "Creating..." : "Create"}
              </Button>
            </div>
          </fieldset>
        </Form>
      </div>
    </>
  );
}

function ValidationMessage({ error, isSubmitting }) {
  const [show, setShow] = useState(!!error);

  useEffect(() => {
    const id = setTimeout(() => {
      const hasError = !!error;
      setShow(hasError && !isSubmitting);
    });
    return () => clearTimeout(id);
  }, [error, isSubmitting]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        height: show ? "1em" : 0,
        color: "red",
        transition: "all 300ms ease-in-out",
      }}
    >
      {error}
    </div>
  );
}

function Label({ children, ...rest }) {
  return (
    <label className="block font-semibold mt-3 mb-1" {...rest}>
      {children}
    </label>
  );
}
