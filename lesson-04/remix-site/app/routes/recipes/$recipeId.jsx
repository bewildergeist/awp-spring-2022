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

  return (
    <div className="my-4 w-9/12 mx-auto">
      <div className="my-6 flex justify-between">
        <h1 className="text-2xl text-extrabold">{recipe.title}</h1>
        <Link
          to=".."
          className="px-6 py-2 font-semibold rounded-md bg-black bg-blue-600/100"
        >
          Back
        </Link>
      </div>

      <h2 className="text-2xl text-bold">Ingredients</h2>
      <ul className="list-disc mx-6 my-5">
        {recipe.trimArr.map((ingredient) => (
          <li key={ingredient}>
            <p>{ingredient}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl text-bold">Description</h2>
      <p className="my-5">{recipe.body}</p>
      <div className="page-footer">
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button
            type="submit"
            className="px-6 py-2 font-semibold rounded-md bg-black bg-red-600/100"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
