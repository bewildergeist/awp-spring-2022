import { Link, useLoaderData } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";

export async function loader() {
  return await fetch(`http://localhost:3000/api/animals`)
}

export default function AnimalsItems() {
  const products = useLoaderData();
  console.log('products: ', products);
  // console.log(`${Location.hostname}:${Location.port}/api/animals`);

  return (
    <div>
      <PageHeader title="Animal" subtitle="LoGgI">
        <LinkButton to="new">New product</LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-3">
        {products.map((product) => (
          <li
            key={product.name}
            className="rounded border border-gray-200 bg-gray-50 p-5">
            <Link to={product.id.toString()} className="font-semibold">
              <h2 className="uppercase font-bold text-xl py-2">{product.name}</h2>
            </Link>
            <div className="w-full max-h-72 overflow-hidden">
            <img className="object-cover w-full" src={product.image_link} alt={product.name} />

            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
