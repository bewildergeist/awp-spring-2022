import { Link, redirect } from "remix";
import db from "~/db/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const body = form.get("body");

<<<<<<< Updated upstream:lesson-04/remix-site/app/routes/posts/new.jsx
=======
  const ingredients = form.get("ingredients").split(', ');

>>>>>>> Stashed changes:lesson-04/remix-site/app/routes/recipes/new.jsx
  const uuid = new Date().getTime().toString(16);
  db.data.posts.push({ id: uuid, title, body });
  db.write();
  return redirect(`/posts/${uuid}`);
};

export default function NewPost() {
  return (
    <>
      <div className="page-header">
        <h1>New Post</h1>
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
            <label htmlFor="body">Post body</label>
            <textarea name="body" id="body"></textarea>
          </div>
          <button className="btn btn-block" type="submit">
            Add Post
          </button>
        </form>
      </div>
    </>
  );
}
