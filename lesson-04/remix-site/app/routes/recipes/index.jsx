import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";
import recipeStyles from "~/styles/recipes.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: recipeStyles,
    },
  ];
}

export async function loader() {
  return db.data.recipes;
}

export default function RecipeItems() {
  const recipes = useLoaderData();

  return (
    <div className="recipes-page">
      <div className="page-header">
        <h1>Recipes</h1>
        <Link to="/recipes/new" className="btn">
          New recipe
        </Link>
      </div>
      <ul className="posts-list">
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={recipe.id}>
              <h3>{recipe.title}</h3>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
