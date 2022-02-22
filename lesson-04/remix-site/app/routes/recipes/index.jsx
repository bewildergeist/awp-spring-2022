import { Link, useLoaderData } from "remix";
import db from "~/db/db.server.js";
import styles from "~/styles/RecipeItems.css";

export async function loader() {
  return db.data.recipes;
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: styles,
    },
  ];
}

export default function RecipeItems() {
  const recipes = useLoaderData();

  return (
    <div>
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
