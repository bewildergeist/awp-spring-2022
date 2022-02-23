import { Link, redirect } from "remix";
import db from "~/db/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const ingredients = form.get("ingredients");

  const ingredientsArr = ingredients.split(",");
  const trimArr = ingredientsArr.map((ingredient) => ingredient.trim());

  const uuid = new Date().getTime().toString(16);
  db.data.recipes.push({ id: uuid, title, trimArr, body });
  db.write();
  return redirect(`/recipes/${uuid}`);
};

export default function NewRecipe() {
  return (
    <>
      <div className="mx-auto w-9/12">
        <div className="flex justify-between my-10">
          <h1 className="text-2xl text-bold">New Recipe</h1>
          <Link
            to="/recipes"
            className="px-6 py-2 font-semibold rounded-md bg-black bg-blue-600/100"
          >
            Back
          </Link>
        </div>
        <div className="page-content">
          <form method="POST">
            <div className="my-4">
              <label className="block my-1" htmlFor="title">
                Title
              </label>
              <input
                className="w-5/12 text-black"
                type="text"
                name="title"
                id="title"
              />
            </div>
            <div className="my-4">
              <label className="block my-1" htmlFor="ingredients">
                Ingredients
              </label>
              <input
                className="w-5/12 text-black"
                type="text"
                name="ingredients"
                id="ingredients"
              />
            </div>
            <div className="my-4">
              <label className="block my-1" htmlFor="body">
                Recipe body
              </label>
              <textarea
                className="w-5/12 text-black"
                name="body"
                id="body"
              ></textarea>
            </div>
            <button
              className="px-6 py-2 font-semibold rounded-md bg-black bg-blue-600/100"
              type="submit"
            >
              Add Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
