import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";

export async function loader() {
  return db.data.recipies;
}

export default function RecipieItems() {
  const recipies = useLoaderData();

  return (
    <div className=" w-1/2 m-auto">
      <div className="page-header flex items-center justify-between">
        <h1 className=" text-4xl font-semibold text-white">Recipies</h1>
        <Link to="/recipies/new" className=" btn-blue">
          New recipie
        </Link>
      </div>
      <ul className="posts-list list-disc p-3">
        {recipies.map((recipie) => (
          <li key={recipie.id}>
            <Link to={recipie.id}>
              <h3 className=" text-green-400">{recipie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
