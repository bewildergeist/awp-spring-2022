import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";

export async function loader() {
  return db.data.recipes;
}

export default function RecipeItems() {
  const recipes = useLoaderData();

  return (
    <div className="text-2xl">
      <div className="p-12">
        <h1 className="font-bold">Recipes</h1>
      </div>
      <ul className="flex items-center flex-col">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="text-blue-200 hover:text-white">
            <Link to={recipe.id}>
              <h3>{recipe.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        className="m-10 flex items-center flex-col bg-transparent border-2 border-white border-solid p-2 rounded-lg transition-all hover:bg-white hover:text-black"
        to="/recipes/new"
      >
        New recipe
      </Link>
    </div>
  );
}
