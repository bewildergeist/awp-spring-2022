import { Link, redirect } from "remix";
import db from "~/db/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const ingredients = form.get("ingredients");
  const body = form.get("body");

  const ingredientsArray = ingredients
    .split(",")
    .map((string) => string.trim());

  const uuid = new Date().getTime().toString(16);
  db.data.posts.push({ id: uuid, title, ingredients: ingredientsArray, body });
  db.write();
  return redirect(`/posts/${uuid}`);
};

export default function NewPost() {
  return (
    <>
      <div className="page-header">
        <h1>New Recipe</h1>
        <Link to="/posts" className="btn btn-reverse">
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
            <label htmlFor="ingredients">Recipe ingredients</label>
            <input type="text" name="ingredients" id="ingredients" />
          </div>
          <div className="form-control">
            <label htmlFor="body">Description</label>
            <textarea name="body" id="body"></textarea>
          </div>
          <button className="btn btn-block" type="submit">
            Add Recipe
          </button>
        </form>
      </div>
    </>
  );
}
