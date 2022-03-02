import { Link, redirect } from "remix";
import Button from "~/components/Button.jsx";
import PageHeader from "~/components/PageHeader";
import Breadcrumb from "~/components/Breadcrumb.jsx";
import db from "~/db/music/db.server";

export const action = async ({ request }) => {
  const form = await request.formData();
  const title = form.get("title");
  const artist = form.get("artist");
  const img = form.get("img");
  const uuid = new Date().getTime().toString(16);
  await fetch(`http://localhost:3000/api/music/`, {
    method: "POST",
    body: JSON.stringify({ id: uuid, artist, title, img }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return redirect(`/music/${uuid}`);
};

export default function NewProduct() {
  return (
    <>
      <Breadcrumb links={[{ to: "/music", title: "Music" }]} />
      <PageHeader title="New Album" subtitle="Make it a good one" />
      <div>
        <form method="post" className="w-64">
          <Label htmlFor="title">Title</Label>
          <input
            type="text"
            name="title"
            id="title"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="artist">Artist</Label>
          <input
            type="text"
            name="artist"
            id="artist"
            className="border p-1 border-gray-200 w-full"
          />
          <Label htmlFor="img">Image</Label>
          <input
            type="text"
            name="img"
            id="img"
            className="border p-1 border-gray-200 w-full"
          />
          <div className="mt-3">
            <Button type="submit">Add product</Button>
          </div>
        </form>
      </div>
    </>
  );
}

function Label({ children, ...rest }) {
  return (
    <label className="block font-semibold mt-3 mb-1" {...rest}>
      {children}
    </label>
  );
}
