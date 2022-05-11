import { redirect, Link } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
import Breadcrumb from "~/components/Breadcrumb.jsx";

export const loader = async function ({ params }) {
  const product = await fetch(
    `http://localhost:3000/api/animals/${params.productId}`
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    fetch(`http://localhost:3000/api/animals/${params.productId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
    }).then(res => console.log(res))
    // TODO: Create an API route and send a DELETE request to it
    return redirect("/animals");
  }
};

export default function Post() {
  const product = useLoaderData();

  const killAnimal = () => {
    console.log('clicked');
    
  }

  return (
    <div >
      <div className="flex flex-row gap-10">
        <div>
          <Breadcrumb links={[{ to: "/animals", title: "Animals" }]} />
          <PageHeader title={product.name} />
          <ul className="list-disc list-inside">
            <li>
              <span className="font-bold">Animal Type: </span>
              <span>{product.animal_type}</span>
            </li>
            <li>
              <span className="font-bold">Latin name: </span>
              <span>{product.latin_name}</span>
            </li>
            <li>
              <span className="font-bold">Habit: </span>
              <span>{product.habitat}</span>
            </li>
            <li>
              <span className="font-bold">Geo range: </span>
              <span>{product.geo_range}</span>
            </li>
            <li>
              <span className="font-bold">Diet: </span>
              <span>{product.diet}</span>
            </li>
            <li>
              <span className="font-bold">Life span: </span>
              <span>{product.lifespan} years</span>
            </li>
          </ul>
        </div>

        <div className="max-w-3xl overflow-hidden p-4 bg-white rounded-md mt-4">
          <img
            className="object-cover w-full"
            src={product.image_link}
            alt={product.name}
          />
        </div>
      </div>
      <form method="post" className="mt-5 pt-2 border-t border-gray-200">
        <Button type="submit" destructive >
          Delete
        </Button>
        <input type="hidden" name="_method" value="delete" />
      </form>
    </div>
  );
}
