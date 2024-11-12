import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string> },
) {
  // Adjusted type
  try {
    // Check if it's a batch delete request
    const contentType = request.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      const { ids } = await request.json();
      if (Array.isArray(ids) && ids.length > 0) {
        // Handle batch delete
        const query = `
          SELECT id, imgurl
          FROM portfolio
          WHERE id = ANY($1::uuid[])
        `;

        const { rows } = await sql.query(query, [ids]);

        if (rows.length === 0) {
          return NextResponse.json(
            { message: "No items found" },
            { status: 404 },
          );
        }

        // Delete from database
        const deleteQuery = `
          DELETE FROM portfolio
          WHERE id = ANY($1::uuid[])
        `;

        await sql.query(deleteQuery, [ids]);

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

        return NextResponse.json(
          { message: "Items deleted successfully" },
          { status: 200 },
        );
      }
    }

    // Handle single item delete (existing functionality)
    const id = params.id;
    const { rows } = await sql`SELECT imgurl FROM portfolio WHERE id = ${id}`;

    if (rows.length === 0) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    const imgUrl = rows[0].imgurl;

    // Delete from database
    await sql`DELETE FROM portfolio WHERE id = ${id}`;

    // Delete from Firebase Storage
    try {
      const imageRef = ref(storage, imgUrl);
      await deleteObject(imageRef);
      console.log("Image deleted from Firebase Storage");
    } catch (firebaseError) {
      console.error("Error deleting image from Firebase:", firebaseError);
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting item(s):", error);
    return NextResponse.json(
      { message: "Error deleting item(s)", error: (error as Error).message },
      { status: 500 },
    );
  }
}
