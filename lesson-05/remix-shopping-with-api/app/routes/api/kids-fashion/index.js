import { json } from "remix";
import db from "~/db/kids-fashion/db.server.js";

export async function loader() {
  return db.data.products ?? [];
}

// await fetch("http://10.44.137.33:3000/kids-fashion/", {
//   method: "POST",
//   body: JSON.stringify({ title, description, id: uuid }),
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export async function action({ request }) {
//   switch (request.method) {
//     case "POST":
//       const body = await request.json();
//       db.data.products?.push(body);
//       db.write();
//       return json(body, {
//         status: 201,
//       });
//   }
// }
