import { Link, useLoaderData } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";

export async function loader() {
  return await fetch("http://localhost:3000/api/pet-supplies");
}

export default function PetSuppliesItems() {
  const products = useLoaderData();

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
            className="rounded border border-gray-200 bg-gray-50 p-5"
          >
            <Link to={product.id} className="font-semibold">
              <h2>{product.title}</h2>
              <p>{product.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
