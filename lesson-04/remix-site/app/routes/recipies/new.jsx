import { Link, redirect } from "remix";
import db from "~/db/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");
  const ingredients = form.get("ingredients");

  let ingredientsArray = ingredients.split(",");

  const uuid = new Date().getTime().toString(16);
  db.data.recipies.push({
    id: uuid,
    title,
    body,
    ingredients: ingredientsArray,
  });
  db.write();
  return redirect(`/recipies/${uuid}`);
};

export default function NewRecipie() {
  return (
    <>
      <div className="page-header w-1/2 m-auto page-header flex items-center justify-between">
        <h1 className=" text-4xl font-semibold text-white">New Recipie</h1>
        <Link
          to="/recipies"
          className="p-4 bg-blue-500 text-white rounded-lg px-8 py-2 hover:bg-slate-100 hover:text-black transition-colors duration-300"
        >
          Back
        </Link>
      </div>
      <div className="page-content w-1/2 m-auto">
        <form method="POST" className="flex flex-col w-2/3">
          <div className="form-control flex  justify-between py-4 flex-col">
            <label htmlFor="title" className=" text-left text-xl">
              Title
            </label>
            <input className=" h-8" type="text" name="title" id="title" />
          </div>
          <div className="form-control flex py-2 flex-col">
            <label htmlFor="ingredients">Recipie ingredients</label>
            <input
              className=" h-8"
              type="text"
              name="ingredients"
              id="ingredients"
            />
          </div>
          <div className="form-control flex justify-between py-2 flex-col">
            <label htmlFor="body">Recipie body</label>
            <textarea name="body" id="body"></textarea>
          </div>

          <button
            className="btn btn-block mt-4 self-start p-4 bg-blue-500 text-white rounded-lg px-8 py-2 hover:bg-slate-100 hover:text-black transition-colors duration-300"
            type="submit"
          >
            Add Recipie
          </button>
        </form>
      </div>
    </>
  );
}
