import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";

export async function loader() {
  return db.data.recipies;
}

export default function RecipieItems() {
  const recipies = useLoaderData();

  return (
    <div>
      <div className="page-header">
        <h1>Recipies</h1>
        <Link to="/recipies/new" className="btn">
          New recipie
        </Link>
      </div>
      <ul className="posts-list">
        {recipies.map((recipie) => (
          <li key={recipie.id}>
            <Link to={recipie.id}>
              <h3>{recipie.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
