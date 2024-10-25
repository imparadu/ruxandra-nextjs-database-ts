import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "@/app/lib/firebaseConfig";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    // First, get the image URL from the database
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
      // Note: We're not failing the whole operation if Firebase deletion fails
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting item:", error);
    return NextResponse.json(
      { message: "Error deleting item", error: (error as Error).message },
      { status: 500 },
    );
  }
}
