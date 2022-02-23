import { Link, redirect } from "remix";
import { useLoaderData } from "remix";
import db from "~/db/db.server";

export const loader = async function ({ params }) {
  const recipie = db.data.recipies.find((p) => p.id === params.postId);

  if (!recipie) {
    throw new Error("Recipie not found");
  }
  return {
    recipie,
  };
};

export const action = async function ({ request, params }) {
  const form = await request.formData();
  if (form.get("_method") === "delete") {
    db.data.recipies = db.data.posts.filter((p) => p.id !== params.postId);
    db.write();
    return redirect("/recipies");
  }
};

export default function Recipie() {
  const { recipie } = useLoaderData();

  return (
    <div>
      <div className="page-header">
        <h1>{recipie.title}</h1>
        <Link to=".." className="btn btn-reverse">
          Back
        </Link>
      </div>
      <div className="page-content">
        {recipie.body}
        <ul>
          {recipie.ingredients.map((ingredient, key) => {
            return <li key={key}>{ingredient}</li>;
          })}
        </ul>
      </div>
      <div className="page-footer">
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button type="submit" className="btn btn-delete">
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
