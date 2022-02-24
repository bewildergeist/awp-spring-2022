import { Link, redirect } from "remix";
import db from "~/db/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const ingredients = form.get("ingredients");

  const ingredientsArray = ingredients
    .split(",")
    .map((string) => string.trim());

  const uuid = new Date().getTime().toString(16);
  db.data.recipes.push({
    id: uuid,
    title,
    body,
    ingredients: ingredientsArray,
  });
  db.write();
  return redirect(`/recipes/${uuid}`);
};

export default function NewRecipe() {
  return (
    <>
      <div className="flex justify-between p-8">
        <h1>New Recipe</h1>
        <Link to="/recipes" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="flex justify-center">
        <form method="POST" className="flex flex-col">
          <label htmlFor="title">Title</label>
          <div>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="title"
              id="title"
            />
          </div>
          <label htmlFor="body">Recipe body</label>
          <div>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="body"
              id="body"
            ></input>
          </div>
          <label htmlFor="ingredients">Ingredients</label>
          <div>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              name="ingredients"
              id="ingredients"
            />
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
}
