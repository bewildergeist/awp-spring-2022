import { Link, redirect } from "remix";
import { useLoaderData } from "remix";
import db from "~/db/db.server";

export const loader = async function ({ params }) {
  const recipe = db.data.recipes.find((p) => p.id === params.recipeId);

  if (!recipe) {
    throw new Error("Recipe not found");
  }
  return {
    recipe,
  };
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    db.data.recipes = db.data.recipes.filter((p) => p.id !== params.recipeId);
    db.write();
    return redirect("/recipes");
  }
};

export default function Recipe() {
  const { recipe } = useLoaderData();
  //console.log(recipe);
  // const ingredients = recipe.ingredients.map((ingredient, index) => {
  //   return <li key={index}>{ingredient}</li>
  // };

  
  //console.log(`<ul>${ingredients}</ul>`);

  return (
    <div>
      <div className="page-header">
        <h1>{recipe.title}</h1>
        <Link to=".." className="btn btn-reverse">
          Back
        </Link>
      </div>
      <h2>Ingredients:</h2>
      <ul>{recipe.ingredientArray.map((item) => (
        <li key={item}><p>{item}</p></li>
        ))}
      </ul>
      <h2>Description:</h2>
      <p className="page-content">{recipe.body}</p>
      <div className="page-footer">
        <form method="recipe">
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="btn btn-delete">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
