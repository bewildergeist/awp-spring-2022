import { Link, useLoaderData } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";

export async function loader() {
  return await fetch("http://localhost:3000/api/kids-fashion");
}

export default function KidsFashionItems() {
  const products = useLoaderData();

  return (
    <div className="">
      <PageHeader title="Kids Fashion" subtitle="For children in all sizes">
        <LinkButton className="bg-blue-100" to="new">
          New kids fashion item
        </LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="rounded border border-gray-200 bg-gray-50 p-5"
          >
            <Link className="" to={product.id} className="font-semibold">
              <h3 className="">{product.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
