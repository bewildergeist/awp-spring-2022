import { redirect } from "remix";
import { useLoaderData } from "remix";
import PageHeader from "~/components/PageHeader";
import Button from "~/components/Button.jsx";
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

export default function Post() {
  const { recipe } = useLoaderData();

  return (
    <div>
      <PageHeader title={recipe.title}>
        <Button to="..">Back</Button>
      </PageHeader>
      <div className="page-content">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients?.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <h2>Description</h2>
        <p>{recipe.body}</p>
      </div>
      <div className="page-footer">
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <Button type="submit" destructive>
            Delete
          </Button>
        </form>
      </div>
    </div>
  );
}
