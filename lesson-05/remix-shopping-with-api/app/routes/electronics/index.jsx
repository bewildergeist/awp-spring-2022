import { Link, useLoaderData } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";

export async function loader() {
  return await fetch("http://localhost:3000/api/electronics");
}

export default function ElectronicsItems() {
  const products = useLoaderData();

  return (
    <div>
      <PageHeader title="Electronics" subtitle="Curated by Ana and Wiktor">
        <LinkButton to="new">New product</LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-3">
        {products.map((product) => (
          <li
            key={product.id}
            className="rounded border text-center border-blue-500 bg-gray-50 p-8 
            text-2xl hover:bg-blue-500 hover:text-gray-50 transition duration-250 hover:ease-in-out
            "
          >
            <Link to={product.id} className="font-semibold">
              <img
                className="object-scale-down h-48 w-96"
                src={product.image}
              />
              <h3>{product.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
