import { useLoaderData, useCatch } from "@remix-run/react";
import { json } from "@remix-run/node";
import connectDb from "~/db/connectDb.server.js";
import { requireUserSession } from "../../sessions.server";

export async function loader({ params, request }) {
  const db = await connectDb();
  const book = await db.models.Book.findById(params.bookId);
  const session = await requireUserSession(request);
  const userId = session.get("userId");

  if (!book) {
    throw new Response(`Couldn't find book with id ${params.bookId}`, {
      status: 404,
    });
  }
  // Verify that the book belongs to the currently logged in user, otherwise throw an 403 error
  if (!book.userId.equals(userId)) {
    throw new Response(`Book doesn't belong to user 📚`, {
      status: 403,
    });
  }
  return json(book);
}

export default function BookPage() {
  const book = useLoaderData();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <code>
        <pre>{JSON.stringify(book, null, 2)}</pre>
      </code>
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <div>
      <h1>
        {caught.status} {caught.statusText}
      </h1>
      <h2>{caught.data}</h2>
    </div>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <h1 className="text-red-500 font-bold">
      {error.name}: {error.message}
    </h1>
  );
}
