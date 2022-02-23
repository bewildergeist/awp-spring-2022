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
    <div className=" w-1/2 m-auto">
      <div className="page-header flex justify-between items-center">
        <h1 className="text-white text-3xl">{recipie.title}</h1>
        <Link
          to=".."
          className="btn btn-block self-start p-4 bg-blue-500 text-white rounded-lg px-8 py-2 hover:bg-slate-100 hover:text-black transition-colors duration-300"
        >
          Back
        </Link>
      </div>
      <div className="page-content mt-6">
        <h2>{recipie.body}</h2>
        <ul className="mt-2">
          {recipie.ingredients.map((ingredient, key) => {
            return <li key={key}>{ingredient}</li>;
          })}
        </ul>
      </div>
      <div className="page-footer">
        <form method="post">
          <input type="hidden" name="_method" value="delete" />
          <button
            type="submit"
            className="btn btn-delete btn-blue bg-red-400 mt-6"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}
