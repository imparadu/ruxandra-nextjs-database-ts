import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

export async function DELETE(
  request: NextRequest,
  context: { params: Record<string, string> },
) {
  try {
    // Await params first before using any of its properties
    const params = await Promise.resolve(context.params);

    // Check if it's a batch delete request
    const contentType = request.headers.get("content-type");
    let ids: string[] = [];

    if (contentType?.includes("application/json")) {
      try {
        const body = await request.text();
        if (body) {
          const { ids: batchIds } = JSON.parse(body);
          if (Array.isArray(batchIds) && batchIds.length > 0) {
            ids = batchIds;
          }
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    }

    // If no batch IDs, use the single ID from params
    if (ids.length === 0) {
      // params is already awaited above
      ids = [params.id];
    }

    // Query to get the image URLs
    const selectQuery = `
      SELECT id, imgurl
      FROM portfolio
      WHERE id = ANY($1::uuid[])
    `;

    const { rows } = await sql.query(selectQuery, [ids]);

    if (rows.length === 0) {
      return NextResponse.json({ message: "No items found" }, { status: 404 });
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
  } catch (error) {
    console.error("Error deleting item(s):", error);
    return NextResponse.json(
      { message: "Error deleting item(s)", error: (error as Error).message },
      { status: 500 },
    );
  }
}
