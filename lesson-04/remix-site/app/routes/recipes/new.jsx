import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
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
  db.data.recipes.push({
    id: uuid,
    title,
    ingredients: ingredientsArray,
    body,
  });
  db.write();
  return redirect(`/recipes/${uuid}`);
};

export default function NewRecipe() {
  return (
    <>
      <PageHeader title="New Recipe">
        <Button to="/recipes">Back</Button>
      </PageHeader>
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
            <label htmlFor="body">Recipe body</label>
            <textarea name="body" id="body"></textarea>
          </div>
          <Button type="submit">Add recipe</Button>
        </form>
      </div>
    </>
  );
}
