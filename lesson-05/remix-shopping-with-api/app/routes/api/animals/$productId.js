import db from "~/db/animals/db.server.js";

export async function loader({ params }) {
  const product = db.data.animals?.find((p) => p.id == params.productId);
  return product;
}

export async function action({request, params}) {
  switch (request.method) {
    case 'GET':
      
      break;
    case 'POST':
      
      break;
    case 'DELETE': 
    try {
      db.data.animals = db.data.animals.filter(animal => animal.id != params.productId)
      db.write()
      return new Response(null, {
        status: 200
      })
      
    } catch {
      return 'failed REsponse'
    }
      break;
    case 'PUT':
      
      break;

      default: 
        return JSON.stringify({response: 200})

    }

}

