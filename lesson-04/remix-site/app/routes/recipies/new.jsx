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
      <div className="page-header">
        <h1>New Recipie</h1>
        <Link to="/recipies" className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        <form method="POST">
          <div className="form-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" />
          </div>
          <div className="form-control">
            <label htmlFor="ingredients">Recipie ingredients</label>
            <input type="text" name="ingredients" id="ingredients" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Recipie body</label>
            <textarea name="body" id="body"></textarea>
          </div>

          <button className="btn btn-block" type="submit">
            Add Recipie
          </button>
        </form>
      </div>
    </>
  );
}
