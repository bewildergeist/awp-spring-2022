import { Form, json, Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/pet-supplies/db.server";
import { useActionData, useTransition } from "remix";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const description = form.get("description");
  const uuid = new Date().getTime().toString(16);

  const errors = {};

  if (!title) errors.title = true;
  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    return json(errors);
  }

  await fetch("http://localhost:3000/api/pet-supplies/", {
    method: "POST",
    body: JSON.stringify({ title, description, id: uuid }),
    headers: {
      "Content-type": "application/json",
    },
  });

  //const data = await response.json();
  return redirect(`/pet-supplies/${uuid}`);
};

export default function NewProduct() {
  const errors = useActionData();
  const transition = useTransition();
  return (
    <>
      <Breadcrumb links={[{ to: "/pet-supplies", title: "Pet supplies" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <Form method="post" className="w-64">
          <fieldset disabled={transition.state === "submitting"}>
            <Label htmlFor="title">Title</Label>
            <input
              type="text"
              name="title"
              id="title"
              className="border p-1 border-gray-200 w-full"
            />
            <p>
              <label>
                {errors?.title ? (
                  <em style={{ color: "red" }}>Title is required</em>
                ) : null}
              </label>
            </p>

            <Label htmlFor="description">Description</Label>
            <textarea
              name="description"
              id="description"
              className="border p-1 border-gray-200 w-full"
            ></textarea>
            <p>
              <label>
                {errors?.description ? (
                  <em style={{ color: "red" }}>Description is required</em>
                ) : null}
              </label>
            </p>

            <div className="mt-3">
              <Button
                type="submit"
                disabled={transition.state === "submitting" ? true : false}
              >
                {transition.state === "submitting"
                  ? "Adding product..."
                  : "Add product"}
              </Button>
            </div>
          </fieldset>
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
