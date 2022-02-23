import { Link, redirect } from "remix";
import db from "~/db/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const ingredients = form.get("ingredients");
  const ingredientArray = ingredients.split(",");
 
  const body = form.get("body");

  const uuid = new Date().getTime().toString(16);
  db.data.recipes.push({ id: uuid, title, ingredientArray, body });
  db.write();
  return redirect(`/recipes/${uuid}`);
};

export default function NewRecipe() {
  return (
    <>
      <div className="page-header">
        <h1 className="text-2xl">New Recipe</h1>
        <Link to="/recipes" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control py-2">
            <label className="block text-white" htmlFor="title">Title</label>
            <input type="text" className="rounded-md p-2" name="title" id="title" />
          </div>
          <div className="form-control py-2">
            <label className="block text-white" htmlFor="ingredients">Ingredients</label>
            <input type="text" className="rounded-md p-2" name="ingredients" id="ingredients" />
          </div>
          <div className="form-control py-2">
            <label className="block text-white" htmlFor="body">Recipe description</label>
            <textarea name="body" className="rounded-md p-2" id="body"></textarea>
          </div>
          <button className="btn btn-block" type="submit">
            Add Recipe
          </button>
        </form>
      </div>
    </>
  );
}
