import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

export async function DELETE(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return new Response(
        JSON.stringify({ message: "Invalid or empty ids array" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    // Format the array for postgres using ARRAY constructor
    const formattedIds = `{${ids.map((id) => `"${id}"`).join(",")}}`;

    // Query to get the image URLs
    const selectQuery = `
      SELECT id, imgurl
      FROM products
      WHERE id = ANY($1::uuid[])
    `;

    const { rows } = await sql.query(selectQuery, [formattedIds]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "No items found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete from database
    const deleteQuery = `
      DELETE FROM products
      WHERE id = ANY($1::uuid[])
    `;

    await sql.query(deleteQuery, [formattedIds]);

    // Delete from Firebase Storage
    const deletePromises = rows.map(async (row) => {
      try {
        const imageRef = ref(storage, row.imgurl);
        await deleteObject(imageRef);
        console.log(`Image ${row.id} deleted from Firebase Storage`);
      } catch (firebaseError) {
        console.error(
          `Error deleting image ${row.id} from Firebase:`,
          firebaseError,
        );
      }
    });

    await Promise.all(deletePromises);

    return new Response(
      JSON.stringify({ message: "Items deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting items:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting items",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
