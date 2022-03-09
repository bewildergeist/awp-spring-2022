import { Link, useLoaderData, Form, redirect } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";

export async function loader() {
  return await fetch("http://localhost:3000/api/mens-fashion");
}

export const action = async function ({ request }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    await fetch(`http://localhost:3000/api/mens-fashion/${form.get("id")}`, {
      method: "DELETE",
    });
    return redirect("/mens-fashion");
  }
};

export default function MensFashionItems() {
  const products = useLoaderData();

  return (
    <div>
      <PageHeader title="Men's fashion" subtitle="Curated by Sarah and Emil">
        <LinkButton to="new">New product</LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-3">
        {products.map((product) => (
          <>
            <li
              key={product.id}
              className="rounded border border-gray-200 bg-gray-50 p-5"
            >
              <Link to={product.id} className="font-semibold">
                <img src={product.image} />
                <h3 className="font-bold">{product.title}</h3>
                <h3 className="font-extralight">{product.description}</h3>
                <h3 className="font-normal text-blue-800">
                  {product.price} ,-
                </h3>
              </Link>
              <Form method="post">
                <input type="hidden" name="id" value={product.id} />
                <Button
                  destructive
                  type="submit"
                  aria-label="delete"
                  name="_method"
                  value="delete"
                >
                  Delete
                </Button>
              </Form>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
