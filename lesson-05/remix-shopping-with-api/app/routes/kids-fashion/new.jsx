import {
  Link,
  redirect,
  useActionData,
  Form,
  json,
  useTransition,
} from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/kids-fashion/db.server";

export const action = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get("title");
  const description = formData.get("description");

  const uuid = new Date().getTime().toString(16);

  const errors = {};
  if (!title) errors.title = true;
  if (!description) errors.description = true;

  if (Object.keys(errors).length) {
    const values = Object.fromEntries(formData);
    return json({ errors, values });
  }

  await fetch(`http://localhost:3000/api/kids-fashion/`, {
    method: "POST",
    body: JSON.stringify({ title, description, id: uuid }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  // TODO: Make a POST request via fetch to an API route that receives JSON data
  // and creates the product in the db
  // throw new Error("POST handler not implemented");

  return redirect(`/kids-fashion/${uuid}`);
};

export default function NewProduct() {
  const actionData = useActionData();
  const transition = useTransition();
  return (
    <>
      <Breadcrumb links={[{ to: "/kids-fashion", title: "Kids fashion" }]} />
      <PageHeader title="New product" subtitle="Make it a good one" />
      <div>
        <Form method="post" className="w-64">
          <fieldset disabled={transition.state === "submitting"}>
            <Label htmlFor="title">Title</Label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={actionData?.values.title}
              className="border p-1 border-gray-200 w-full"
            />

            {actionData?.errors.name ? (
              <p style={{ color: "red" }}>{actionData.errors.name}</p>
            ) : null}

            <Label htmlFor="description">Description</Label>
            <textarea
              name="description"
              id="description"
              defaultValue={actionData?.values.description}
              className="border p-1 border-gray-200 w-full"
            ></textarea>

            {actionData?.errors.description ? (
              <p style={{ color: "red" }}>{actionData.errors.description}</p>
            ) : null}

            <div className="mt-3">
              <Button type="submit">
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
