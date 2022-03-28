import { Link, useLoaderData } from "remix";
import LinkButton from "~/components/LinkButton.jsx";
import PageHeader from "~/components/PageHeader";

export async function loader() {
  return await fetch("http://localhost:3000/api/toys");
}

export default function toysItems() {
  const products = useLoaderData();

  return (
    <div>
      <PageHeader title="Toys" subtitle="Curated by Dan">
        <LinkButton to="new">New product</LinkButton>
      </PageHeader>
      <ul className="grid gap-4 grid-cols-3 ">
        {products.map((product) => (
          <li
            key={product.id}
            className="relative border-gray-200 bg-white after:transition-all after:duration-500 after:content.[*] after:absolute after:h-0.5 after:w-0 after:bg-blue-600 hover:after:w-full after:bottom-0"
          >
            <Link to={product.id} className="font-semibold">
              <div className="relative card">
                <img
                  className="relative block m-auto after:content.[See more] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:bg-blue-600 h-72"
                  src={product.image}
                  alt={product.imageAlt}
                />
                <div className="p-5">
                  <h2 className="text-xl my-2 font-medium">{product.title}</h2>
                  <p className="price font-bold text-blue-600">
                    {product.price}$
                  </p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
