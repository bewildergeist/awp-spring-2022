import { Link, useLoaderData, Form, redirect } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import { useTransition } from "remix";

export async function loader() {
  return await fetch("http://localhost:3000/api/pet-supplies");
}

export const action = async function ({ request, params }) {
  const form = await request.formData();
  const productId = form.get("id");

  if (form.get("_method") === "delete") {
    await fetch(`http://localhost:3000/api/pet-supplies/${productId}`, {
      method: "DELETE",
    });
    return redirect("/pet-supplies");
  }
};

export default function PetSuppliesItems() {
  const products = useLoaderData();
  const transition = useTransition();

  return (
    <div>
      <PageHeader
        title="Pet supplies"
        subtitle="Curated by Magdalena and Jonathan"
      >
        <LinkButton to="new">New product</LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-3">
        {products.map((product) => (
          <li
            key={product.id}
            className={
              transition.state === "submitting" &&
              transition.submission.formData.get("id") === String(product.id)
                ? " rounded border border-gray-200 bg-gray-500 p-5"
                : " rounded border border-gray-200 bg-gray-50 p-5"
            }
          >
            <Link to={product.id} className="font-semibold">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </Link>
            <Form method="post" className="mt-5 pt-2 border-t border-gray-200">
              <input type="hidden" name="_method" value="delete" />
              <input type="hidden" name="id" value={product.id} />
              <Button type="submit" destructive>
                Delete
              </Button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  );
}
