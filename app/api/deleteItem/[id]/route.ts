import { NextRequest } from "next/server";
import { sql } from "@vercel/postgres";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

type Params = Promise<{ id: string }>;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const { id } = await params;

    // Query to get the image URLs
    const selectQuery = `
      SELECT id, imgurl
      FROM products
      WHERE id = $1
    `;

    const { rows } = await sql.query(selectQuery, [id]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ message: "No item found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Delete from database
    const deleteQuery = `
      DELETE FROM products
      WHERE id = $1
    `;

    await sql.query(deleteQuery, [id]);

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
      JSON.stringify({ message: "Item deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return new Response(
      JSON.stringify({
        message: "Error deleting item",
        error: (error as Error).message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
