import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";

export async function loader() {
  return db.data.recipes;
}

export default function RecipeItems() {
  const recipes = useLoaderData();

  return (
    <div className="w-9/12 mx-auto my-4">
      <div className="flex justify-between ">
        <h1 className="text-2xl text-bold">Recipes</h1>
        <Link
          to="/recipes/new"
          className="p-3 font-semibold rounded-md bg-black bg-blue-600/100"
        >
          New Recipe
        </Link>
      </div>

      <ul className="mx-6 list-disc">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={recipe.id}>
              <h3 className="text-emerald-500/100">{recipe.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
